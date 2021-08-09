import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateStreamInput {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field()
    code!: string;

    @Field()
    status!: string;

    @Field()
    type!: string;

    @Field()
    projectId!: string;
}
