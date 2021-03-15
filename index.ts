import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-hapi';
import { buildSchema } from 'type-graphql';

import Hapi from '@hapi/hapi';

import { HelloResolver } from './graphql/rosolvers/helloResolver'

async function StartServer() {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false,
        }),
    });

    const app = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    app.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    apolloServer.applyMiddleware({ app, cors: false });

    await app.start();
    console.log('Server running on %s', app.info.uri);
}

StartServer().catch(error => console.log(error));