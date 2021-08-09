import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateProjectInput {
    @Field()
    name!: string;

    @Field()
    salesforcePid!: string;

    @Field()
    status!: string;

    @Field()
    sla!: string;
}
