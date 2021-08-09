import { gql } from 'apollo-server';
import { makeClient } from '../test-utils/client';

describe('testing stream endpoints', () => {
    const testClient = makeClient();

    it('creates new stream', async (done) => {
        const name = 'Awesome stream';
        const code  = 'awesome_1234567';
        const projectId = '1234567';
        const status = 'ACTIVE';
        const type = 'TWITTER';
        const client = await testClient;
        const myMutation = gql`mutation {
            createStream (
                input: {name: "${name}", projectId: "${projectId}", status: "${status}", type: "${type}", code: "${code}"}) {
              name
              status
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            createStream: {
                name: name,
                status: status,
            },
        });
        done();
    });

    it('updates existing stream', async (done) => {
        const id = '88888888_stream';
        const name = 'UPDATED!';
        const code  = 'awesome_1234567';
        const projectId = '1234567';
        const status = 'ACTIVE';
        const type = 'INSTAGRAM';
        const client = await testClient;
        const myMutation = gql`mutation {
            updateStream (
                input: {id: "${id}", name: "${name}", projectId: "${projectId}", status: "${status}", type: "${type}", code: "${code}"}) {
              name
              status
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            updateStream: {
                name: name,
                status: status,
            },
        });
        done();
    });

    it('returns selected stream', async (done) => {
        const client = await testClient;
        const streamId = '1234567_stream';
        const myQuery = gql`query {
            streams(input: { ids: ["${streamId}"], limit: 1, offset: 0 }) {
                id
                name
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            streams: [{
                id: streamId,
                name: 'Very Cool!',
            }],
        });
        done();
    });

    it('lists all streams', async (done) => {
        const client = await testClient;
        const projectId = '1234567';
        const myQuery = gql`query {
            streams(input: { projectId: "${projectId}", limit:2, offset: 0 }) {
                id
                name
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            streams: [{
                id: '1234567_stream',
                name: 'Very Cool!',
            }, {
                id: '7654321_stream',
                name: 'Even Cooler!',
            }],
        });
        done();
    });

    it('lists all streams with threir settings', async (done) => {
        const client = await testClient;
        const projectId = '1234567';
        const myQuery = gql`query {
            streams(input: { projectId: "${projectId}", limit:2, offset: 0 }) {
                id
                name
                settings {
                    address
                    owned
                }
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            streams: [{
                id: '1234567_stream',
                name: 'Very Cool!',
                settings: {
                    address: "https://facebook.com/icuc",
                    owned: true,
                },
            }, {
                id: '7654321_stream',
                name: 'Even Cooler!',
                settings: {
                    address: "https://facebook.com/icuc",
                    owned: true,
                },
            }],
        });
        done();
    });

    it('returns selected stream with its changelog', async (done) => {
        const client = await testClient;
        const streamId = '1234567_stream';
        const myQuery = gql`query {
            streams(input: { ids: ["${streamId}"], limit: 1, offset: 0 }) {
                id
                name
                changeLog {
                    author {
                        id
                        name
                    }
                    value
                    createdAt
                }
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            streams: [{
                id: streamId,
                name: 'Very Cool!',
                changeLog: [{
                    author: {
                        id: "123",
                        name: "Author First Name",
                    },
                    value: "added something...",
                    createdAt: "Wed Mar 31 2021",
                },{
                    author: {
                        id: "123",
                        name: "Author First Name",
                    },
                    value: "changed something...",
                    createdAt: "Wed Mar 31 2021",
                }],
            }],
        });
        done();
    });
});
