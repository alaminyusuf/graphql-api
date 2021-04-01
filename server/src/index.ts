import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-hapi';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import Hapi from '@hapi/hapi';

import { HelloResolver } from './graphql/Query/helloResolver';
import { UserResolver } from './graphql/Mutation/addUser';

async function StartServer() {
	await createConnection({
		type: 'mongodb',
		host: 'localhost',
		port: 27017,
		database: 'graphql-api',
		logging: false,
		entities: ['src/db/models/*{.ts,.js}'],
		migrations: ['src/migration/**/*{.ts,.js}'],
		useUnifiedTopology: true,
	}).then((conn) => console.log('MongoDB connected', conn.isConnected));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false,
		}),
	});

	const app = Hapi.server({
		port: 3000,
		host: 'localhost',
	});

	app.route({
		method: 'GET',
		path: '/',
		handler: () => {
			return '<h1>Hello from GraphQL Api</h1>';
		},
	});

	apolloServer.applyMiddleware({ app, cors: false });

	await app.start();
	console.log('Server running on %s', app.info.uri);
}

StartServer().catch((error) => console.error('Error:', error));
