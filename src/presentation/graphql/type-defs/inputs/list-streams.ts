import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ListStreamsInput {
    @Field(() => String, { nullable: true })
    projectId?: string;

    @Field(() => [String], { nullable: true })
    ids?: string[];

    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;
}
