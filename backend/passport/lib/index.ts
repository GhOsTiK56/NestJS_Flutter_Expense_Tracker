import { createHmac, timingSafeEqual } from 'node:crypto'
import { buffer } from 'node:stream/consumers'

const HMAC_DOMAIN = 'PassportToken/v1'
const INTERNAL_SEP = '|'

function base64UrlEncode(buf: Buffer | string) {
	const s = typeof buf === 'string' ? Buffer.from(buf) : buffer

	return s
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}

function base64UrlDecode(str: string) {
	str = str.replace(/-/g, '+').replace(/_/g, '/')

	while (str.length % 4) str += '='

	return Buffer.from(str, 'base64').toString()
}

function constantTimeEqual(a: string, b: string) {
	const bufA = Buffer.from(a)
	const bufB = Buffer.from(b)

	if (bufA.length !== bufB.length) return false

	return timingSafeEqual(bufA, bufB)
}

function now() {
	return Math.floor(Date.now() / 1000)
}

function serialize(user: string, iat: string, exp: string) {
	return [HMAC_DOMAIN, user, iat, exp].join(INTERNAL_SEP)
}

function computeHmac(secretKey: string, data: string) {
	return createHmac('sha256', secretKey).update(data).digest('hex')
}

function generateToken(secretKey: string, userId: string, ttl: number) {
	const issuedAt = now()
	const expiresAt = issuedAt + ttl

	const userPart = base64UrlEncode(userId)
	const iatPart = base64UrlEncode(String(issuedAt))
	const expPart = base64UrlEncode(String(expiresAt))

	const serialized = serialize(userPart, iatPart, expPart)
	const mac = computeHmac(secretKey, serialized)

	return `${userPart}.${iatPart}.${expPart}.${mac}`
}

// console.log('GENERATED_TOKEN: ', generateToken('123456', 'user-1234', 1))

function verifyToken(secretKey: string, token: string) {
	const parts = token.split('.')

	if (parts.length !== 4) return { valid: false, reason: 'Invalid format' }

	const [userPart, iatPart, expPart, mac] = parts

	const serialized = serialize(userPart, iatPart, expPart)

	const expectedMac = computeHmac(secretKey, serialized)

	if (!constantTimeEqual(expectedMac, mac))
		return { valid: false, reason: 'Invalid signature' }

	const expNumber = Number(base64UrlDecode(expPart))

	if (!Number.isFinite(expNumber)) return { valid: false, reason: 'Error' }
	if (now() > expNumber) return { valid: false, reason: 'Expired' }

	return { valid: true, userId: base64UrlDecode(userPart) }
}

console.log(
	'USER_ID: ',
	verifyToken(
		'123456',
		'dXNlci0xMjM0.MTc3OTc5NTgwNw.MTc3OTc5NTgwOA.7fb81a02ea163bb41782b0956995b743c03c1db59494160732ed5e6bd2a95169'
	)
)
