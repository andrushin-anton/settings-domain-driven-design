import { NotFoundError } from '@src/common';
import {
    ProjectId,
    ProjectSettings,
    ClassificationAction,
} from '@src/domain/project';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';

export class InMemoryProjectSettingsRepository implements ProjectSettingsRepository {
    private projectSettings: ProjectSettings[] = [
        new ProjectSettings(
            new ProjectId('1234567'),
            true,
            false,
            false,
            false,
        ),
        new ProjectSettings(
            new ProjectId('7654321'),
            false,
            false,
            true,
            false,
        ),
    ];

    private classificationActions: ClassificationAction[] = [
        new ClassificationAction(
            new ProjectId('1234567'),
            'WATCHWORD',
            true,
            '',
        ),
        new ClassificationAction(
            new ProjectId('1234567'),
            'WATCH_TRANSLATION',
            false,
            '',
        ),
    ];

    readProjectSettings(projectId: ProjectId): ProjectSettings {
        const foundProjectSettingsArr: ProjectSettings[] = this.projectSettings.filter(
            (el) => el.getId().equals(projectId),
        );
        if (!foundProjectSettingsArr.length) {
            throw new NotFoundError();
        }
        return foundProjectSettingsArr[0];
    }

    readProjectClassificationActions(projectId: ProjectId): ClassificationAction[] {
        const projectClassifications: ClassificationAction[] = this.classificationActions.filter(
            (el) => el.getId().equals(projectId),
        );
        return projectClassifications;
    }

    saveProjectSettings(projectSettings: ProjectSettings): void {
        let foundProjectSettings = false;
        let index = 0;
        /* eslint-disable-next-line */
        for (let object of this.projectSettings) {
            if (projectSettings.getId().equals(object.getId())) {
                foundProjectSettings = true;
                // need to update it
                this.projectSettings[index] = projectSettings;
                break;
            }
            index += 1;
        }
        if (!foundProjectSettings) {
            // need to save it
            this.projectSettings.push(projectSettings);
        }
    }

    saveProjectMlSettings(projectId: ProjectId, newActions: ClassificationAction[]): void {
        // if no actions
        if (!newActions.length) {
            this.removeAllProjectClassications(projectId);
            return;
        }
        // add/update ClassificationActions
        newActions.forEach((newAction) => {
            let index = 0;
            let foundAction = false;
            this.classificationActions.forEach((existingAction) => {
                if (existingAction.getId().equals(projectId)) {
                    if (existingAction.getTypeCode() === newAction.getTypeCode()) {
                        // update it
                        this.classificationActions[index] = newAction;
                        foundAction = true;
                        return;
                    }
                }
                index += 1;
            });
            if (!foundAction) {
                // it is a new action, need to save it
                this.classificationActions.push(newAction);
            }
        });
        // remove the actions that are not in the newActions but still in existingActions
        const currentProjectActions = this.classificationActions.filter(
            (el) => el.getId().equals(projectId),
        );
        currentProjectActions.forEach((currentAction) => {
            const actionExists = newActions.some(
                (el) => el.getTypeCode() === currentAction.getTypeCode(),
            );
            if (!actionExists) {
                this.removeAction(currentAction);
            }
        });
    }

    removeAllProjectClassications(projectId: ProjectId): void {
        let index = 0;
        this.classificationActions.forEach((existingAction) => {
            if (projectId.equals(existingAction.getId())) {
                this.classificationActions.splice(index, 1);
            }
            index += 1;
        });
    }

    removeAction(action: ClassificationAction): void {
        let index = 0;
        this.classificationActions.forEach((existingAction) => {
            if (action.getId().equals(existingAction.getId())
            && action.getTypeCode() === existingAction.getTypeCode()) {
                this.classificationActions.splice(index, 1);
            }
            index += 1;
        });
    }
}
