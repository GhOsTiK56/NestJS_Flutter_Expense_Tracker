import type { DataBaseConfig } from './database.interface'
import type { GrpcConfig } from './grpc.interface'
import type { PassportConfig } from './passport.interface'
import type { RedisConfig } from './redis.interface'

export interface AllConfigs {
	database: DataBaseConfig
	grpc: GrpcConfig
	passport: PassportConfig
	redis: RedisConfig
}
