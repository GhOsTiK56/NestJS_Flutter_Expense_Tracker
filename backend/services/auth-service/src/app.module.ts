import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { dataBaseEnv, grpcEnv, passportEnv, redisEnv, rmqEnv } from './config'
import { MessagingModule } from './infrastructure/messaging/messaging.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { AccountModule } from './modules/account/account.module'
import { AuthModule } from './modules/auth/auth.module'
import { OtpModule } from './modules/otp/otp.module'
import { UsersModule } from './modules/users/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [dataBaseEnv, grpcEnv, passportEnv, redisEnv, rmqEnv]
		}),
		PrismaModule,
		RedisModule,
		MessagingModule,
		AuthModule,
		OtpModule,
		AccountModule,
		UsersModule
	]
})
export class AppModule {}
