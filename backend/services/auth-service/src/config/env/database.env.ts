import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/shared/utils'

import { DataBaseConfig } from '../interfaces/database.interface'
import { DataBaseValidator } from '../validators'

export const dataBaseEnv = registerAs<DataBaseConfig>('database', () => {
	validateEnv(process.env, DataBaseValidator)

	return {
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT),
		name: process.env.DATABASE_NAME
	}
})
