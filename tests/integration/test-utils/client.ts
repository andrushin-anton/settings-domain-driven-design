import 'reflect-metadata';
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { createTestServer } from './server';

export const makeClient = async (): Promise<ApolloServerTestClient> => {
    const apolloServer = await createTestServer();
    const testClient = createTestClient(apolloServer);

    return testClient;
};
