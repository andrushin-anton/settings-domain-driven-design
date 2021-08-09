import {
    ProjectId,
    ProjectMlSettings,
    ProjectMlSettingsToJson,
    ProjectSettingsToJson,
} from '@src/domain/project';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';

export async function readProjectSettings(
    projectId: string,
    projectSettingsRepo: ProjectSettingsRepository,
): Promise<ProjectSettingsToJson> {
    const settings = await projectSettingsRepo.readProjectSettings(new ProjectId(projectId));
    const settingsDeserialised = settings.jsonSerialize() as ProjectSettingsToJson;
    return settingsDeserialised;
}

export async function readProjectMlSettings(
    project: string,
    projectSettingsRepo: ProjectSettingsRepository,
): Promise<ProjectMlSettingsToJson> {
    const projectId = new ProjectId(project);
    const classificationActions = await
    projectSettingsRepo.readProjectClassificationActions(projectId);
    const settings = new ProjectMlSettings(
        projectId,
        classificationActions,
    );
    return settings.jsonSerialize() as ProjectMlSettingsToJson;
}
