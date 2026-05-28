import { OtpRequestedEvent } from '@budgetro/contracts'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class MessagingService {
	public constructor(
		@Inject('NOTIFICATIONS_CLIENT') private readonly client: ClientProxy
	) {}

	public async otpReqested(data: OtpRequestedEvent) {
		return this.client.emit('auth.otp.requested', data)
	}
}
