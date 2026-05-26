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
		example: 'karen@gmail.com'
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
		example: 'email',
		enum: ['phone', 'email']
	})
	@IsEnum(IdentifierType)
	public identifierType!: 'phone' | 'email'
}
