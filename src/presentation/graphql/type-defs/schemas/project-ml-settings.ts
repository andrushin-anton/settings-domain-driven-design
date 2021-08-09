import { Field, ObjectType } from 'type-graphql';
import { ClassificationAction } from './project-ml-settings-classification';

@ObjectType()
export class ProjectMlSettings {
    @Field()
    id!: string;

    @Field(() => [ClassificationAction], { nullable: true, defaultValue: [] })
    actions!: [ClassificationAction];
}
