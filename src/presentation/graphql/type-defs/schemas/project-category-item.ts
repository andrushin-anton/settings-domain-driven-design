import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ProjectCategoryItem {
    @Field()
    id!: string;

    @Field()
    code!: string;

    @Field()
    description!: string;

    @Field()
    sortOrder!: number;
}
