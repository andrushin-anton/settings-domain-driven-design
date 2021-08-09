import { Field, ID, ObjectType } from 'type-graphql';
import { StreamChangeLog } from './stream-change-log';
import { StreamSettings } from './stream-settings';

@ObjectType()
export class Stream {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    code!: string;

    @Field()
    projectId!: string;

    @Field()
    status!: string;

    @Field()
    type!: string;

    @Field(() => StreamSettings, { nullable: true, defaultValue: [] })
    settings!: StreamSettings;

    @Field(() => [StreamChangeLog], { nullable: true, defaultValue: [] })
    changeLog!: [StreamChangeLog];
}
