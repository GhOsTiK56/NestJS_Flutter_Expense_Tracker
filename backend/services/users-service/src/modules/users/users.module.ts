import { PROTO_PATHS } from '@budgetro/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AccountClientGrpc } from '@/infrastructure/grpc/clients/account.client'

import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'ACCOUNT_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'account.v1',
						protoPath: PROTO_PATHS.ACCOUNT,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
						loader: {
							keepCase: false,
							longs: String,
							enums: String,
							defaults: true,
							oneofs: true
						}
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AccountClientGrpc]
})
export class UsersModule {}
