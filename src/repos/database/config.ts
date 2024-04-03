import EnvVars from '../../constants/EnvVars';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: EnvVars.Database.host || 'localhost',
	port: +EnvVars.Database.databasePort,
	username: EnvVars.Database.username || 'user',
	password: EnvVars.Database.password || 'root',
	database: EnvVars.Database.databaseName || 'express',
	synchronize: false,
	logging: false,
	migrations: ['dist/repos/migrations/*.js', 'src/repos/migrations/*.ts'],
	entities: ['dist/repos/entities/*.js', 'src/repos/entities/*.ts'],
});
