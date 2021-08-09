import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectSettingsClassificationActionInput {
    @Field()
    id!: string;

    @Field()
    typeCode!: string;

    @Field()
    active!: boolean;

    @Field()
    value!: string;
}
