import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangeLogInput {
    @Field()
    id!: string;

    @Field()
    authorId!: string;

    @Field()
    authorName!: string;

    @Field()
    value!: string;
}
