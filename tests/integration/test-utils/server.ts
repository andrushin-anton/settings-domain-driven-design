import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@src/presentation/graphql/resolvers';
import { TEST_DECODED_TOKEN } from './mocks/tokens';
import { DataProviderMock } from './mocks/data-provider';

export const createTestServer = async (): Promise<ApolloServer> => {
    const schema = await buildSchema({ resolvers });
    const dataProvider = new DataProviderMock();
    return new ApolloServer({
        schema,
        playground: false,
        context: () => ({
            token: TEST_DECODED_TOKEN,
            dataProvider,
        }),
    });
};
