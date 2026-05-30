import { Injectable } from '@nestjs/common'
import { User } from '@prisma/generated/client'
import { UserCreateInput, UserUpdateInput } from '@prisma/generated/models'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class UsersRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findByAccountId(accountId: string): Promise<User | null> {
		return await this.prismaService.user.findUnique({
			where: {
				accountId
			}
		})
	}

	public async create(data: UserCreateInput): Promise<User> {
		return await this.prismaService.user.create({ data })
	}

	public async update(
		accountId: string,
		data: UserUpdateInput
	): Promise<User> {
		return await this.prismaService.user.update({
			where: {
				accountId
			},
			data
		})
	}

	public async delete(accountId: string): Promise<User> {
		return await this.prismaService.user.delete({
			where: {
				accountId
			}
		})
	}
}
