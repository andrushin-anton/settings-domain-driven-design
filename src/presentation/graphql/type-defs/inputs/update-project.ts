import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProjectInput {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field()
    salesforcePid!: string;

    @Field()
    status!: string;

    @Field()
    sla!: string;
}
