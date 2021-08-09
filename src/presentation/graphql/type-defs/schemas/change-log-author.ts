import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ChangeLogAuthor {
    @Field()
    id!: string;

    @Field()
    name!: string;
}
