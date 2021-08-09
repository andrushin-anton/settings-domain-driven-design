import { Field, ID, ObjectType } from 'type-graphql';
import { ProjectCategory } from './project-category';
import { ProjectChangeLog } from './project-change-log';
import { ProjectMlSettings } from './project-ml-settings';
import { ProjectSettings } from './project-settings';

@ObjectType()
export class Project {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    salesforcePid!: string;

    @Field()
    status!: string;

    @Field()
    sla!: string;

    @Field(() => ProjectSettings, { nullable: true, defaultValue: [] })
    settings!: ProjectSettings;

    @Field(() => ProjectMlSettings, { nullable: true, defaultValue: [] })
    mlSettings!: ProjectMlSettings;

    @Field(() => [ProjectCategory], { nullable: true, defaultValue: [] })
    categories!: [ProjectCategory];

    @Field(() => [ProjectChangeLog], { nullable: true, defaultValue: [] })
    changeLog!: [ProjectChangeLog];
}
