import { gql } from 'apollo-server';
import { makeClient } from '../test-utils/client';

describe('testing project category endpoints', () => {
    const testClient = makeClient();

    it('saving project categories', async (done) => {
        const client = await testClient;
        const myMutation = gql`mutation {
            saveProjectCategories (
            projectId: "7654321",
            categories:[{
            id:"8417228b-9a5b-4f8f-b074-2c5de4cafd4e"
            projectId:"7654321",
            type:"MULTIPLE",
            code: "APPROVE",
            description:"approve ....",
            deleteFlag:false,
            brandFlag:false,
            width:"WIDE",
            color:"#234234",
            displayType:"LIST",
            exclusiveFlag:true,
            regectionFlag:false,
            escalateFlag:false,
            approveFlag:false,
            items:[
              {
                code:"S",
                description:"desc....",
                sortOrder:1
              },
              {
                code:"M",
                description:"desc....",
                sortOrder:2
              }
            ]
          },
          {
            projectId:"7654321",
            type:"MULTIPLE",
            code: "APPROVE",
            description:"approve ....",
            deleteFlag:false,
            brandFlag:false,
              width:"WIDE",
            color:"#fff",
            displayType:"LIST",
            exclusiveFlag:true,
            regectionFlag:false,
            escalateFlag:false,
            approveFlag:false,
            items:[
              {
                code:"APP",
                description:"desc....",
                sortOrder:1
              }
            ]
          }]) {
              type
              color
              items {
                  code
              }
            }
          }`;

        const res = await client.mutate({ mutation: myMutation });
        global.console.log(res);
        expect(res.data).toMatchObject({
            saveProjectCategories: [{
                type: 'MULTIPLE',
                color: '#234234',
                items: [{
                    code: 'S',
                },{
                    code: 'M',
                }],
            },{
                type: 'MULTIPLE',
                color: '#fff',
                items: [{
                    code: 'APP',
                }],
            }],
        });
        done();
    });
});
