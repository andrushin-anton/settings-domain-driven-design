import { PublisherRepository } from '@src/domain/event/publisher-repository';
import {
    ClassificationAction,
    ProjectId,
    ProjectSettings,
    ProjectSettingsEventMessage,
    ProjectSettingsToJson,
} from '@src/domain/project';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';

export async function saveProjectSettings(
    project: string,
    rollup: boolean,
    asset: boolean,
    trackOnly: boolean,
    brndEntriesOnly: boolean,
    projectSettingsRepo: ProjectSettingsRepository,
    pub: PublisherRepository,
): Promise<void> {
    const projectSettings = new ProjectSettings(
        new ProjectId(project),
        rollup,
        asset,
        trackOnly,
        brndEntriesOnly,
    );
    await projectSettingsRepo.saveProjectSettings(projectSettings);

    const event: ProjectSettingsEventMessage = {
        message: projectSettings.jsonSerialize() as ProjectSettingsToJson,
    };
    pub.publish('user.project-settings.modified', event);
}

export async function saveProjectMlSettings(
    projectId: string,
    actions: ClassificationAction[],
    projectSettingsRepo: ProjectSettingsRepository,
): Promise<void> {
    return projectSettingsRepo.saveProjectMlSettings(
        new ProjectId(projectId),
        actions,
    );
}
