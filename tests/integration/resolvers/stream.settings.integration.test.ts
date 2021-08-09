import { gql } from 'apollo-server';
import { makeClient } from '../test-utils/client';

describe('Testing stream settings', () => {
    const testClient = makeClient();

    it('saving stream settings', async (done) => {
        const id = '1234567_stream';
        const address = 'https://www.com';
        const owned = true;
        const otherBrandReply = false;
        const translate = true;
        const debug = false;
        const data = '';
        const ignoreMentions = false;
        const ignoreInstagramTags = false;
        const ignoreInstagramMentions = false;
        const instagramAdsEnabled = false;
        const facebookAdsEnabled = false;
        const client = await testClient;
        const myMutation = gql`mutation {
            saveStreamSettings (
                input: {
                    id: "${id}", 
                    address: "${address}", 
                    owned: ${owned}, 
                    otherBrandReply: ${otherBrandReply}, 
                    translate: ${translate}, 
                    debug: ${debug}, 
                    data: "${data}", 
                    ignoreMentions: ${ignoreMentions}, 
                    ignoreInstagramTags: ${ignoreInstagramTags},
                    ignoreInstagramMentions: ${ignoreInstagramMentions},
                    instagramAdsEnabled: ${instagramAdsEnabled},
                    facebookAdsEnabled: ${facebookAdsEnabled},
                }) {
              address
              owned
              translate
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        expect(res.data).toMatchObject({
            saveStreamSettings: {
                address: 'https://www.com',
                owned: owned,
                translate: translate,
            },
        });
        done();
    });
});