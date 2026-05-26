import { RpcStatus } from '@budgetro/common'
import type {
	SendOtpRequest,
	SignUpRequest,
	VerifyOtpRequest
} from '@budgetro/contracts/gen/auth'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { createHash } from 'crypto'

import { Account } from '../../../prisma/generated/client'
import { OtpService } from '../otp/otp.service'

import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
	public constructor(
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService
	) {}

	public async signUp(data: SignUpRequest) {
		const { name, identifier, identifierType } = data
		const { passwordHash } = this.generatePasswordHash(data)

		let account: Account | null

		if (identifierType === 'phone')
			account = await this.authRepository.findByPhone(identifier)
		else account = await this.authRepository.findByEmail(identifier)

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
			account = await this.authRepository.findByPhone(identifier)
		else account = await this.authRepository.findByEmail(identifier)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})

		const code = await this.otpService.send(
			identifier,
			identifierType as 'phone | email'
		)

		console.debug('CODE: ', code)

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
			account = await this.authRepository.findByPhone(identifier)
		else account = await this.authRepository.findByEmail(identifier)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})

		if (identifierType === 'phone' && !account.isPhoneVerified)
			await this.authRepository.update(account.id, {
				isPhoneVerified: true
			})

		if (identifierType === 'email' && !account.isEmailVerified)
			await this.authRepository.update(account.id, {
				isEmailVerified: true
			})

		return { accessToken: '123456', refreshToken: '123456' }
	}
}
