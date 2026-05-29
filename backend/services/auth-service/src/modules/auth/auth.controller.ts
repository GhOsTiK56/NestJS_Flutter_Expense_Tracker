import type {
	LogInRequest,
	LogInResponse,
	LogoutRequest,
	LogoutResponse,
	RefreshRequest,
	RefreshResponse,
	SendOtpRequest,
	SendOtpResponse,
	SignUpRequest,
	SignUpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse
} from '@budgetro/contracts/gen/auth'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SignUp')
	public async signUp(data: SignUpRequest): Promise<SignUpResponse> {
		return await this.authService.signUp(data)
	}

	@GrpcMethod('AuthService', 'LogIn')
	public async logIn(data: LogInRequest): Promise<LogInResponse> {
		return await this.authService.logIn(data)
	}

	@GrpcMethod('AuthService', 'SendOtp')
	public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		return await this.authService.sendOtp(data)
	}

	@GrpcMethod('AuthService', 'VerifyOtp')
	public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
		return await this.authService.verifyOtp(data)
	}

	@GrpcMethod('AuthService', 'Refresh')
	public async refresh(data: RefreshRequest): Promise<RefreshResponse> {
		return await this.authService.refresh(data)
	}

	@GrpcMethod('AuthService', 'Logout')
	public async logout(data: LogoutRequest): Promise<LogoutResponse> {
		return await this.authService.logout(data)
	}
}
