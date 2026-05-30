import { InjectGrpcClient } from '@budgetro/common'
import type { UsersServiceClient } from '@budgetro/contracts/gen/users'
import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { AbstractGrpcClient } from '../../shared/grpc'

@Injectable()
export class UsersClientGrpc extends AbstractGrpcClient<UsersServiceClient> {
	constructor(@InjectGrpcClient('USERS_PACKAGE') client: ClientGrpc) {
		super(client, 'UsersService')
	}
}
