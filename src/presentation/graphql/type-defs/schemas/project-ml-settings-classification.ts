import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ClassificationAction {
    @Field()
    id!: string;

    @Field()
    typeCode!: string;

    @Field()
    active!: boolean;

    @Field()
    value!: string;
}
