import { InjectGrpcClient } from '@budgetro/common'
import type { AccountServiceClient } from '@budgetro/contracts/gen/account'
import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { AbstractGrpcClient } from '../../shared/grpc'

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
	constructor(@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc) {
		super(client, 'AccountService')
	}
}
