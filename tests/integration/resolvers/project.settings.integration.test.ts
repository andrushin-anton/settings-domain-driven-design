import { gql } from 'apollo-server';
import { makeClient } from '../test-utils/client';

describe('Testing project settings', () => {
    const testClient = makeClient();

    it('saving project settings', async (done) => {
        const id = '1234567';
        const rollup = true;
        const asset = false;
        const trackOnly = false;
        const brndEntriesOnly = true;
        const client = await testClient;
        const myMutation = gql`mutation {
            saveProjectSettings (
                input: {id: "${id}", rollup: ${rollup}, asset: ${asset}, trackOnly: ${trackOnly}, brndEntriesOnly: ${brndEntriesOnly}}) {
              rollup
              asset
              trackOnly
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            saveProjectSettings: {
                rollup: rollup,
                asset: asset,
                trackOnly: trackOnly,
            },
        });
        done();
    });
});