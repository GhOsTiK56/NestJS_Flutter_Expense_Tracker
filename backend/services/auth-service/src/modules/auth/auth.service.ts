import { RpcStatus } from '@budgetro/common'
import type {
	LogoutRequest,
	RefreshRequest,
	SendOtpRequest,
	SignUpRequest,
	VerifyOtpRequest
} from '@budgetro/contracts/gen/auth'
import { PassportService, TokenPayload } from '@budgetro/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import { createHash } from 'crypto'

import type { AllConfigs } from '@/config'
import { MessagingService } from '@/infrastructure/messaging/messaging.service'
import { UserRepository } from '@/shared/repositories'

import { Account } from '../../../prisma/generated/client'
import { OtpService } from '../otp/otp.service'

import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
	public readonly ACCESS_TOKEN_TTL: number
	public readonly REFRESH_TOKEN_TTL: number

	public constructor(
		private readonly configServive: ConfigService<AllConfigs>,
		private readonly authRepository: AuthRepository,
		private readonly userRepository: UserRepository,
		private readonly otpService: OtpService,
		private readonly passportService: PassportService,
		private readonly messagingService: MessagingService
	) {
		this.ACCESS_TOKEN_TTL = this.configServive.get('passport.accessTtl', {
			infer: true
		})
		this.REFRESH_TOKEN_TTL = this.configServive.get('passport.refreshTtl', {
			infer: true
		})
	}

	public async signUp(data: SignUpRequest) {
		const { name, identifier, identifierType } = data
		const { passwordHash } = this.generatePasswordHash(data)

		let account: Account | null

		if (identifierType === 'phone')
			account = await this.userRepository.findByPhone(identifier)
		else account = await this.userRepository.findByEmail(identifier)

		if (!account) {
			account = await this.authRepository.createAccount({
				name: name,
				password: passwordHash,
				email: identifierType === 'email' ? identifier : undefined,
				phone: identifierType === 'phone' ? identifier : undefined
			})
		}

		await this.sendOtp({
			identifier,
			identifierType
		})

		return { ok: true }
	}

	private generatePasswordHash(data: SignUpRequest) {
		const { password } = data

		const passwordHash = createHash('sha256').update(password).digest('hex')

		return { passwordHash }
	}

	public async sendOtp(data: SendOtpRequest) {
		const { identifier, identifierType } = data

		let account: Account | null

		if (identifierType === 'phone')
			account = await this.userRepository.findByPhone(identifier)
		else account = await this.userRepository.findByEmail(identifier)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})

		const { code } = await this.otpService.send(
			identifier,
			identifierType as 'phone' | 'email'
		)

		await this.messagingService.otpReqested({
			identifier,
			identifierType,
			code
		})

		return { ok: true }
	}

	public async verifyOtp(data: VerifyOtpRequest) {
		const { identifier, code, identifierType } = data

		await this.otpService.verify(
			identifier,
			code,
			identifierType as 'phone' | 'email'
		)

		let account: Account | null

		if (identifierType === 'phone')
			account = await this.userRepository.findByPhone(identifier)
		else account = await this.userRepository.findByEmail(identifier)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})

		if (identifierType === 'phone' && !account.isPhoneVerified)
			await this.userRepository.update(account.id, {
				isPhoneVerified: true
			})

		if (identifierType === 'email' && !account.isEmailVerified)
			await this.userRepository.update(account.id, {
				isEmailVerified: true
			})

		await this.authRepository.revokeAllActiveRefreshTokens(account.id)

		return await this.generateTokens(account.id)
	}

	public async refresh(data: RefreshRequest) {
		const { refreshToken } = data

		const result = this.passportService.verify(refreshToken)

		if (!result.valid) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: result.reason
			})
		}

		const refreshTokenHash = this.hashToken(refreshToken)
		const storedToken =
			await this.authRepository.findRefreshTokenByHash(refreshTokenHash)

		if (
			!storedToken ||
			storedToken.revoked ||
			storedToken.expiresAt.getTime() <= Date.now()
		) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: 'Refresh token invalid or expired'
			})
		}

		if (storedToken.accountId !== result.userId) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: 'Refresh token does not belong to this user'
			})
		}

		await this.authRepository.revokeRefreshToken(storedToken.id)

		return await this.generateTokens(result.userId)
	}

	public async logout(data: LogoutRequest) {
		const { refreshToken } = data

		if (!refreshToken) return { ok: true }

		const result = this.passportService.verify(refreshToken)

		if (!result.valid) return { ok: true }

		const refreshTokenHash = this.hashToken(refreshToken)
		const storedToken =
			await this.authRepository.findRefreshTokenByHash(refreshTokenHash)

		if (storedToken && !storedToken.revoked) {
			await this.authRepository.revokeRefreshToken(storedToken.id)
		}

		return { ok: true }
	}

	private async generateTokens(userId: string) {
		const payload: TokenPayload = { sub: userId }

		const accessToken = this.passportService.generate(
			String(payload.sub),
			this.ACCESS_TOKEN_TTL
		)

		const refreshToken = this.passportService.generate(
			String(payload.sub),
			this.REFRESH_TOKEN_TTL
		)

		const expiresAt = new Date(Date.now() + this.REFRESH_TOKEN_TTL * 1000)
		const refreshTokenHash = this.hashToken(refreshToken)

		await this.authRepository.createRefreshToken({
			account: {
				connect: { id: userId }
			},
			tokenHash: refreshTokenHash,
			expiresAt
		})

		return { accessToken, refreshToken }
	}

	private hashToken(token: string) {
		return createHash('sha256').update(token).digest('hex')
	}
}
