import { PassportOptions } from '@budgetro/passport'
import type { ConfigService } from '@nestjs/config'

export function getPassportConfig(
	configService: ConfigService
): PassportOptions {
	return {
		secretKey: configService.getOrThrow<string>('PASSPORT_SECRET_KEY')
	}
}
