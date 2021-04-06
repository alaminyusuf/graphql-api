import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { MyContext } from './types';

import express from 'express';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';

import { HelloResolver } from './graphql/Query/helloResolver';
import { UserResolver } from './graphql/Mutation/user';
import { UserQuery } from './graphql/Query/user';

dotenv.config();

async function StartServer() {
	await createConnection({
		type: 'mongodb',
		host: 'localhost',
		port: 27017,
		database: 'graphql-api',
		logging: true,
		entities: ['src/models/*{.ts,.js}'],
		useUnifiedTopology: true,
	}).then((conn) => console.log('MongoDB connected', conn.isConnected));

	const app = express();

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	);

	app.use(
		session({
			store: new MongoStore({
				mongoUrl: process.env.MONGO_URI,
				mongoOptions: {
					appname: 'graphql-api',
					useUnifiedTopology: true,
				},
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365,
				httpOnly: true,
				secure: false,
			},
			resave: false,
			secret: process.env.COOKIE_SECRET!,
			name: process.env.COOKIE_NAME,
			saveUninitialized: false,
		})
	);

	app.get('/', (req, res) =>
		res.send('<h1>Hello from this awesome mock Api</h1>')
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver, UserQuery],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ req, res }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(3000, () => console.log('Server running'));
}

StartServer().catch((error) => console.error('Error:', error));
