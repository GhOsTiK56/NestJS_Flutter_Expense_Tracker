import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { CurrentUser, Protected } from '../../shared/decorators'

import { GetMeResponse } from './dto'
import { PatchUserRequest } from './dto/requests'
import { UsersClientGrpc } from './users.grpc'

@Controller('users')
export class UsersController {
	public constructor(private readonly client: UsersClientGrpc) {}

	@ApiOperation({
		summary: 'Get current user profile',
		description: 'Returns authenticated user profile data'
	})
	@ApiOkResponse({
		type: GetMeResponse
	})
	@ApiBearerAuth()
	@Protected()
	@Get('@me')
	@HttpCode(HttpStatus.OK)
	public async getMe(@CurrentUser() userId: string) {
		const { user } = await this.client.call('getMe', { accountId: userId })

		return {
			id: user?.id,
			name: user?.name ?? undefined,
			phone: user?.phone || undefined,
			email: user?.email || undefined,
			avatar: user?.avatar ?? undefined
		}
	}

	@ApiBearerAuth()
	@Protected()
	@Patch('@me')
	@HttpCode(HttpStatus.OK)
	public async patchUser(
		@CurrentUser() userId: string,
		@Body() dto: PatchUserRequest
	) {
		return await this.client.call('patchUser', { userId, ...dto })
	}
}
