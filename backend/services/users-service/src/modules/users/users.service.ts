import { RpcStatus } from '@budgetro/common'
import type {
	CreateUserRequest,
	GetMeRequest,
	PatchUserRequest
} from '@budgetro/contracts/gen/users'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

import { AccountClientGrpc } from '@/infrastructure/grpc/clients/account.client'

import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
	public constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async getMe(data: GetMeRequest) {
		const { accountId } = data

		const profile = await this.usersRepository.findByAccountId(accountId)

		if (!profile)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: accountId })
		)

		return {
			user: {
				id: profile.accountId,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				phone: account.phone || undefined,
				email: account.email || undefined
			}
		}
	}

	public async create(data: CreateUserRequest) {
		const existing = await this.usersRepository.findByAccountId(
			data.accountId
		)

		if (existing) return { ok: true }

		await this.usersRepository.create({ accountId: data.accountId })

		return { ok: true }
	}

	public async patch(data: PatchUserRequest) {
		const { userId, name } = data

		const user = await this.usersRepository.findByAccountId(userId)

		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})

		await this.usersRepository.update(user.accountId, {
			...(name !== undefined && { name })
		})

		return { ok: true }
	}
}
