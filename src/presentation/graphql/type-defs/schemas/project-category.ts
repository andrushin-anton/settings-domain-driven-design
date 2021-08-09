import { Field, ObjectType } from 'type-graphql';
import { ProjectCategoryItem } from './project-category-item';

@ObjectType()
export class ProjectCategory {
    @Field()
    id!: string;

    @Field()
    projectId!: string;

    @Field()
    code!: string;

    @Field()
    type!: string;

    @Field()
    width!: string;

    @Field()
    color!: string;

    @Field()
    displayType!: string;

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

    @Field(() => [ProjectCategoryItem], { nullable: true, defaultValue: [] })
    items!: [ProjectCategoryItem];
}
