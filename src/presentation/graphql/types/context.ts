// import { ISamples } from 'src/data-sources/samples';
// import { MqPubSub } from '../mq-pubsub';
import { DataProviderInterface } from '@src/common/data-provider-interface';
import { DecodedToken } from './token';

// export interface DataSources {
//     samples: ISamples;
// }

export interface SubPayload {
    id: number;
    user: string;
    msg?: string;
}

export interface SubArgs {
    topic: string;
}

export interface Context {
    subscribePayload: SubPayload;
    subscribeArgs: SubArgs;
    token: DecodedToken;
    dataProvider: DataProviderInterface;
}

export interface ExpressContextInput {
    req: {
        headers: {
            authorization?: string
        }
    }
}
