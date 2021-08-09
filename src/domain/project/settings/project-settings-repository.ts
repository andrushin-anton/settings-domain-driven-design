import { ProjectId } from '../project-id';
import { ClassificationAction } from './classification-action';
import { ProjectSettings } from './project-settings';

export interface ProjectSettingsRepository {
    readProjectSettings(projectId: ProjectId): Promise<ProjectSettings> | ProjectSettings;
    readProjectClassificationActions(
        projectId: ProjectId
    ): Promise<Array<ClassificationAction>> | Array<ClassificationAction>;

    saveProjectSettings(projectSettings: ProjectSettings): Promise<void> | void;
    saveProjectMlSettings(
        projectId: ProjectId,
        actions: ClassificationAction[],
    ): Promise<void> | void;
}
