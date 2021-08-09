import {
    Ctx,
    Arg,
    Resolver,
    Mutation,
} from 'type-graphql';
import { ClassificationAction as DomainClassificationAction, ProjectId } from '@src/domain/project';
import { saveProjectMlSettings, saveProjectSettings } from '@src/application/project-settings-save-actions';
import { Context } from '../types/context';
import { ProjectSettings } from '../type-defs/schemas/project-settings';
import { ProjectSettingsInput } from '../type-defs/inputs/project-settings-input';
import { ProjectSettingsClassificationActionInput } from '../type-defs/inputs/project-ml-settings-classification-input';
import { ClassificationAction } from '../type-defs/schemas/project-ml-settings-classification';
import { checkPermissions } from '../middlewares/permissions';
import { PermissionType, ScopeType } from '../types/permission-types';

@Resolver(() => ProjectSettings)
export class ProjectSettingsResolver {
    @Mutation(() => ProjectSettings)
    async saveProjectSettings(
        @Arg('input') input: ProjectSettingsInput, @Ctx() ctx: Context,
    ): Promise<ProjectSettings> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.Modify]);
        const {
            id,
            rollup,
            asset,
            trackOnly,
            brndEntriesOnly,
        } = input;
        await saveProjectSettings(
            id,
            rollup,
            asset,
            trackOnly,
            brndEntriesOnly,
            ctx.dataProvider.projectSettingsRepository(),
            ctx.dataProvider.mqPublisher(),
        );
        return {
            id,
            rollup,
            asset,
            trackOnly,
            brndEntriesOnly,
        };
    }

    @Mutation(() => [ClassificationAction])
    async saveProjectMlSettings(
        @Arg('projectId') projectId: string,
            @Arg('actions', () => [ProjectSettingsClassificationActionInput]) actions: ProjectSettingsClassificationActionInput[],
            @Ctx() ctx: Context,
    ): Promise<ClassificationAction[]> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.Create]);
        const projectMlActions: DomainClassificationAction[] = [];
        const result: ClassificationAction[] = [];
        actions.forEach(
            (el) => {
                const {
                    typeCode,
                    active,
                    value,
                } = el;
                const action = new DomainClassificationAction(
                    new ProjectId(projectId),
                    typeCode,
                    active,
                    value,
                );
                projectMlActions.push(action);
                result.push({ ...el });
            },
        );

        await saveProjectMlSettings(
            projectId,
            projectMlActions,
            ctx.dataProvider.projectSettingsRepository(),
        );
        return result;
    }
}
