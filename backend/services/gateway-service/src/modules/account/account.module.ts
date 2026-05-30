import { Module } from '@nestjs/common'
import { GrpcModule } from '@budgetro/common'

import { AccountClientGrpc } from './account.grpc'
import { AccountController } from './account.controller'

@Module({
  imports: [GrpcModule.register(['ACCOUNT_PACKAGE'])],
  controllers: [AccountController],
  providers: [AccountClientGrpc],
  exports: [AccountClientGrpc]
})
export class AccountModule {}
