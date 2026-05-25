import type {
	SendOtpRequest,
	SendOtpResponse,
	SignUpRequest,
	SignUpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse
} from '@ghostik/contracts/gen/auth'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		return await this.authService.sendOtp(data)
	}

	@GrpcMethod('AuthService', 'SignUp')
	public async signUp(data: SignUpRequest): Promise<SignUpResponse> {
		return await this.authService.signUp(data)
	}

	@GrpcMethod('AuthService', 'VerifyOtp')
	public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
		return await this.authService.verifyOtp(data)
	}
}
