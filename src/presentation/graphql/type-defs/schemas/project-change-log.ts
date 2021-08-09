import { Field, ObjectType } from 'type-graphql';
import { ChangeLogAuthor } from './change-log-author';

@ObjectType()
export class ProjectChangeLog {
    @Field()
    id!: string;

    @Field(() => ChangeLogAuthor)
    author!: ChangeLogAuthor;

    @Field()
    value!: string;

    @Field()
    createdAt!: string;
}
