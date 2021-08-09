import { Field, InputType } from 'type-graphql';
import { ProjectCategoryItemInput } from './project-category-item-input';

@InputType()
export class ProjectCategoryInput {
    @Field({ nullable: true })
    id?: string;

    @Field()
    projectId!: string;

    @Field()
    code!: string;

    @Field()
    description!: string;

    @Field()
    type!: string;

    @Field()
    width!: string;

    @Field()
    displayType!: string;

    @Field()
    color!: string;

    @Field()
    deleteFlag!: boolean;

    @Field()
    brandFlag!: boolean;

    @Field()
    exclusiveFlag!: boolean;

    @Field()
    regectionFlag!: boolean;

    @Field()
    escalateFlag!: boolean;

    @Field()
    approveFlag!: boolean;

    @Field(() => [ProjectCategoryItemInput], { nullable: true, defaultValue: [] })
    items!: [ProjectCategoryItemInput];
}
