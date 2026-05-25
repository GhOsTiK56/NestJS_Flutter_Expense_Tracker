import { ApiProperty } from '@nestjs/swagger'
import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate
} from 'class-validator'

import { IdentifierValidator } from '../../../../shared/validators'

import { IdentifierType } from './send-otp.request'

export class VerifyOtpRequest {
	@ApiProperty({
		example: '+71234567890'
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier!: string

	@ApiProperty({
		example: '123456'
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code!: string

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email']
	})
	@IsEnum(IdentifierType)
	public identifierType!: 'phone' | 'email'
}
