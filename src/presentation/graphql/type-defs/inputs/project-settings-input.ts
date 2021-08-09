import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectSettingsInput {
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
