import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { NotFoundError, errorHandler } from '@src/common';
import { statusRouter } from '@src/presentation/rest';
import { resolvers } from '@src/presentation/graphql/resolvers';
import { buildSchema } from 'type-graphql';
import { ExpressContextInput } from './presentation/graphql/types/context';
import { decodeToken, TOKEN_SECRET } from './presentation/graphql/middlewares/permissions';
import { DataProvider } from './infrastructure/data-provider';

async function main(): Promise<void> {
    const app = express();
    const schema = await buildSchema({ resolvers, emitSchemaFile: true });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: ExpressContextInput) => ({
            token: decodeToken(req.headers.authorization || '', TOKEN_SECRET),
            dataProvider: new DataProvider(),
        }),
    });
    apolloServer.applyMiddleware({ app });
    // REST API routes
    app.use(statusRouter);
    app.all('*', (_req, _res) => {
        throw new NotFoundError();
    });
    app.use(errorHandler);
    // start the server
    app.listen({ port: process.env.PORT || 3000 }, () => {
        global.console.info(`App is listening on port ${process.env.PORT || 3000}`);
    });
}

main()
    .catch((e: Error) => global.console.error(e));
