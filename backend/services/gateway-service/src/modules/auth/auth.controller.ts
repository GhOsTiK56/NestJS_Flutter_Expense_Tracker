import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, SignUpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly client: AuthClientGrpc) {}

	@ApiOperation({
		summary: 'SignUp',
		description: 'Register user'
	})
	@Post('sign-up')
	@HttpCode(HttpStatus.OK)
	public signUp(@Body() dto: SignUpRequest) {
		return this.client.signUp(dto)
	}

	@ApiOperation({
		summary: 'Send otp code',
		description: 'Sends a verification code to user phone number or email'
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto)
	}

	@ApiOperation({
		summary: 'Verify otp code',
		description:
			'Verifies the code sent to the user phone number or email and returns a access token.'
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.client.verifyOtp(dto)
	}
}
