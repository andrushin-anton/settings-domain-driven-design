import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ProjectSettings {
    @Field()
    id!: string;

    @Field()
    rollup!: boolean;

    @Field()
    asset!: boolean;

    @Field()
    trackOnly!: boolean;

    @Field()
    brndEntriesOnly!: boolean;
}
