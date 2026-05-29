import {
	EmailChangedEvent,
	OtpRequestedEvent,
	PhoneChangedEvent
} from '@budgetro/contracts'
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

	public async phoneChanged(data: PhoneChangedEvent) {
		return this.client.emit('account.phone.changed', data)
	}

	public async emailChanged(data: EmailChangedEvent) {
		return this.client.emit('account.email.changed', data)
	}
}
