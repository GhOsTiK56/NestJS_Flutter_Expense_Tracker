import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { dataBaseEnv } from './config/env'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [dataBaseEnv] }),
		PrismaModule,
		UsersModule
	]
})
export class AppModule {}
