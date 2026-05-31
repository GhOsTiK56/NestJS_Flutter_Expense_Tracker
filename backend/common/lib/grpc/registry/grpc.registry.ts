import { PROTO_PATHS } from '@budgetro/contracts'

export const GRPC_CLIENTS = {
	AUTH_PACKAGE: {
		package: 'auth.v1',
		protoPath: PROTO_PATHS.AUTH,
		env: 'AUTH_GRPC_URL'
	},
	ACCOUNT_PACKAGE: {
		package: 'account.v1',
		protoPath: PROTO_PATHS.ACCOUNT,
		env: 'AUTH_GRPC_URL'
	},
	USERS_PACKAGE: {
		package: 'users.v1',
		protoPath: PROTO_PATHS.USERS,
		env: 'USERS_GRPC_URL'
	},
	TRANSACTIONS_PACKAGE: {
		package: 'transactions.v1',
		protoPath: PROTO_PATHS.TRANSACTIONS,
		env: 'TRANSACTIONS_GRPC_URL'
	}
} as const
