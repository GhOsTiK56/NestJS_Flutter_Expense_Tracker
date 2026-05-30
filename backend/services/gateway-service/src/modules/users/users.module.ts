import { PROTO_PATHS } from '@budgetro/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UsersClientGrpc } from './users.grpc'
import { UsersController } from './users.controller';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'USERS_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'users.v1',
						protoPath: PROTO_PATHS.USERS,
						url: configService.getOrThrow<string>('USERS_GRPC_URL'),
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
	providers: [UsersClientGrpc],
	exports: [UsersClientGrpc]
})
export class UsersModule {}
