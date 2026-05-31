import { join } from "path";

export const PROTO_PATHS = {
  AUTH: join(__dirname, "../../proto/auth.proto"),
  ACCOUNT: join(__dirname, "../../proto/account.proto"),
  USERS: join(__dirname, "../../proto/users.proto"),
  TRANSACTIONS: join(__dirname, "../../proto/transactions.proto")
} as const;
