import { PassportModule } from '@budgetro/passport'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getPassportConfig } from '@/config'
import { UserRepository } from '@/shared/repositories'

import { OtpService } from '../otp/otp.service'
import { UsersModule } from '../users/user.module'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

@Module({
	imports: [
		UsersModule,
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, UserRepository, OtpService]
})
export class AuthModule {}
