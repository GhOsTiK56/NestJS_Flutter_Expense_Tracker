import { Injectable } from '@nestjs/common'
import { Account, RefreshToken } from '@prisma/generated/client'
import {
	AccountCreateInput,
	AccountUpdateInput,
	RefreshTokenCreateInput
} from '@prisma/generated/models'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class AuthRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findByPhone(phone: string): Promise<Account | null> {
		return await this.prismaService.account.findUnique({
			where: {
				phone
			}
		})
	}

	public async findByEmail(email: string): Promise<Account | null> {
		return await this.prismaService.account.findUnique({
			where: {
				email
			}
		})
	}

	public async createAccount(data: AccountCreateInput): Promise<Account> {
		return await this.prismaService.account.create({
			data
		})
	}

	public async update(
		id: string,
		data: AccountUpdateInput
	): Promise<Account> {
		return await this.prismaService.account.update({
			where: {
				id
			},
			data
		})
	}

	public async createRefreshToken(
		data: RefreshTokenCreateInput
	): Promise<RefreshToken> {
		return await this.prismaService.refreshToken.create({
			data
		})
	}

	public async findRefreshTokenByHash(
		tokenHash: string
	): Promise<RefreshToken | null> {
		return await this.prismaService.refreshToken.findUnique({
			where: {
				tokenHash
			}
		})
	}

	public async revokeRefreshToken(id: string): Promise<RefreshToken> {
		return await this.prismaService.refreshToken.update({
			where: {
				id
			},
			data: {
				revoked: true
			}
		})
	}

	public async revokeAllActiveRefreshTokens(
		accountId: string
	): Promise<{ count: number }> {
		const result = await this.prismaService.refreshToken.updateMany({
			where: {
				accountId,
				revoked: false,
				expiresAt: {
					gt: new Date()
				}
			},
			data: {
				revoked: true
			}
		})

		return { count: result.count }
	}
}
