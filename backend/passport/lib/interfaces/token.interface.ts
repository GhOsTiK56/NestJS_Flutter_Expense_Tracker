export interface TokenPayload {
	sub: string | number
}

export interface VerifyResult {
	valid: boolean
	readon?: string
	userId?: string
}
