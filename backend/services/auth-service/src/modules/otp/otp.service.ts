import { RpcStatus } from '@budgetro/common'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { createHash } from 'node:crypto'
import { generateCode } from 'patcode'

import { RedisService } from '../../infrastructure/redis/redis.service'

@Injectable()
export class OtpService {
	public constructor(private readonly redisService: RedisService) {}

	public async send(identifier: string, identifiryType: 'phone | email') {
		const { code, hash } = this.generateCode()

		await this.redisService.set(
			`otp:${identifiryType}:${identifier}`,
			hash,
			'EX',
			'300'
		)

		return code
	}

	public async verify(
		identifier: string,
		code: string,
		identifierType: 'phone' | 'email'
	) {
		const storedHash = await this.redisService.get(
			`otp:${identifierType}:${identifier}`
		)

		if (!storedHash) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Invalid or expired code'
			})
		}
		const incomingHash = createHash('sha256').update(code).digest('hex')

		if (storedHash !== incomingHash)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Invalid or expired code'
			})

		await this.redisService.del(`otp:${identifierType}:${identifier}`)
	}

	private generateCode() {
		const code = generateCode()
		const hash = createHash('sha256').update(code).digest('hex')

		return { code, hash }
	}
}
