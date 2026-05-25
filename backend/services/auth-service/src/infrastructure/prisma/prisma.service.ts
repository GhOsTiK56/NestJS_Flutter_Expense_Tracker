import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../../prisma/generated/client'
import type { AllConfigs } from '../../config'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	public constructor(
		private readonly configService: ConfigService<AllConfigs>
	) {
		const adapter = new PrismaPg({
			user: configService.get('database.user', { infer: true }),
			password: configService.get('database.password', { infer: true }),
			host: configService.get('database.host', { infer: true }),
			port: configService.get('database.port', { infer: true }),
			database: configService.get('database.name', { infer: true })
		})

		super({ adapter })
	}

	public async onModuleInit() {
		const start = Date.now()

		this.logger.log('Connecting to DataBase...')

		try {
			await this.$connect()

			const ms = Date.now() - start

			this.logger.log(`Database connection established (time=${ms}ms)`)
		} catch (error) {
			this.logger.error('Failed to connect to DataBase: ', error)
			throw error
		}
	}

	public async onModuleDestroy() {
		this.logger.log('Disconnection from DataBase...')

		try {
			await this.$disconnect()

			this.logger.log('DataBase connecion close')
		} catch (error) {
			this.logger.error('Failed to disconnect from DataBase: ', error)
			throw error
		}
	}
}
