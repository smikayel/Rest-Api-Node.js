/**
 * Environments variables declared here.
 */

import dotenv from 'dotenv'

dotenv.config()

export default {
	NodeEnv: process.env.NODE_ENV ?? '',
	Port: process.env.PORT ?? 0,
	Jwt: {
		Secret: process.env.JWT_SECRET ?? 'super secret',
		Exp: '1h',
	},
	refreshJwt: {
		Secret: process.env.JWT_SECRET ?? 'super secret',
		Exp: '8h',
	},
	Database: {
		databaseName: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		databasePort: process.env.DATABASE_PORT || 3306,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	},
} as const
