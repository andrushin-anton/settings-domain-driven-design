import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class StreamSettings {
    @Field()
    id!: string;

    @Field()
    address!: string;

    @Field()
    owned!: boolean;

    @Field()
    otherBrandReply!: boolean;

    @Field()
    translate!: boolean;

    @Field()
    debug!: boolean;

    @Field()
    data!: string;

    @Field()
    ignoreMentions!: boolean;

    @Field()
    ignoreInstagramTags!: boolean;

    @Field()
    ignoreInstagramMentions!: boolean;

    @Field()
    instagramAdsEnabled!: boolean;

    @Field()
    facebookAdsEnabled!: boolean;
}
