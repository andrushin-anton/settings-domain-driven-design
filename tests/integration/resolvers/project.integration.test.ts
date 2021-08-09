import { gql } from 'apollo-server';
import { makeClient } from '../test-utils/client';

describe('testing project endpoints', () => {
    const testClient = makeClient();

    it('creates new project', async (done) => {
        const name = 'Awesome project';
        const pid  = 'PID1111';
        const status = 'ACTIVE';
        const sla = '2 HOURS';
        const client = await testClient;
        const myMutation = gql`mutation {
            createProject (
                input: {name: "${name}", salesforcePid: "${pid}", status: "${status}", sla: "${sla}"}) {
              name
              status
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            createProject: {
                name: name,
                status: status,
            },
        });
        done();
    });

    it('updates existing project', async (done) => {
        const id = '88888888';
        const name = 'UPDATED! Awesome project';
        const pid  = 'PID1111';
        const status = 'ACTIVE';
        const sla = '2 HOURS';
        const client = await testClient;
        const myMutation = gql`mutation {
            updateProject (
                input: {id: "${id}", name: "${name}", salesforcePid: "${pid}", status: "${status}", sla: "${sla}"}) {
              name
              status
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            updateProject: {
                name: name,
                status: status,
            },
        });
        done();
    });

    it('returns selected project', async (done) => {
        const client = await testClient;
        const projectId = '1234567';
        const myQuery = gql`query {
            projects(input: { ids: ["${projectId}"], limit: 1, offset: 0 }) {
                id
                name
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            projects: [{
                id: projectId,
                name: 'First',
            }],
        });
        done();
    });

    it('lists all projects', async (done) => {
        const client = await testClient;
        const myQuery = gql`query {
            projects(input: { limit:2, offset: 0 }) {
                id
                name
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            projects: [{
                id: '1234567',
                name: 'First',
            }, {
                id: '7654321',
                name: 'Second',
            }],
        });
        done();
    });

    it('lists all projects with categories', async (done) => {
        const client = await testClient;
        const myQuery = gql`query {
            projects(input: { limit:2, offset: 0 }) {
                id
                name
                categories {
                    id
                    code
                    items {
                        code
                    }
                }
            }
          }`;
        const res = await client.query({ query: myQuery });
        expect.assertions(1);
        expect(res.data).toMatchObject({
            projects: [{
                id: '1234567',
                name: 'First',
                categories: [{
                    id: "1234",
                    code: "APPROVED",
                    items: [{
                        code: "APPROVE",
                    }],
                },{
                    id: "4321",
                    code: "REJECTED",
                    items: [{
                        code: "HIDE",
                    }],
                }],
            }, {
                id: '7654321',
                name: 'Second',
            }],
        });
        done();
    });
});
