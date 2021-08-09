import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectCategoryItemInput {
    @Field()
    code!: string;

    @Field()
    description!: string;

    @Field()
    sortOrder!: number;
}
