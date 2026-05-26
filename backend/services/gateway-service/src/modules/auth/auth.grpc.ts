import type {
	AuthServiceClient,
	SendOtpRequest,
	SignUpRequest,
	VerifyOtpRequest
} from '@budgetro/contracts/gen/auth'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService!: AuthServiceClient

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.authService =
			this.client.getService<AuthServiceClient>('AuthService')
	}

	public sendOtp(request: SendOtpRequest) {
		return this.authService.sendOtp(request)
	}

	public signUp(request: SignUpRequest) {
		return this.authService.signUp(request)
	}

	public verifyOtp(request: VerifyOtpRequest) {
		return this.authService.verifyOtp(request)
	}
}
