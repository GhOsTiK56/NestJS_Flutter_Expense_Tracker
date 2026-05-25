import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	MinLength
} from 'class-validator'

import { IdentifierType } from './send-otp.request'

export class SignUpRequest {
	@ApiProperty({
		example: 'Karen'
	})
	@IsString({
		message: 'The name must be a string'
	})
	@IsNotEmpty({
		message: 'The name is required to fill in'
	})
	public name!: string

	@ApiProperty({
		example: 'karen@gmail.com'
	})
	@IsString({
		message: 'The email must be a string'
	})
	@IsNotEmpty({
		message: 'The email is required to fill in'
	})
	@IsEmail()
	public identifier!: string

	@ApiProperty({
		example: 'email',
		enum: ['phone', 'email']
	})
	@IsEnum(IdentifierType)
	public identifierType!: 'phone | email'

	@ApiProperty({
		example: '123456'
	})
	@IsString({
		message: 'The password must be a string'
	})
	@IsNotEmpty({
		message: 'The password is required to fill in'
	})
	@MinLength(6, {
		message: 'The password must be contains at least 6 characters'
	})
	public password!: string
}
