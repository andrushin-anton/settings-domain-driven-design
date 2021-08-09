import { Entity } from '@src/domain/basic';
import { ProjectId } from '../project-id';
import { ClassificationAction, ClassificationActionToJson } from './classification-action';

export interface ProjectMlSettingsToJson {
    id: string,
    actions: ClassificationActionToJson[]
}

export class ProjectMlSettings extends Entity {
    private actions: Array<ClassificationAction>;

    public constructor(projectId: ProjectId, actions: Array<ClassificationAction>) {
        super(projectId);
        this.actions = actions;
    }

    public getActions(): Array<ClassificationAction> {
        return this.actions;
    }

    public addClassificationAction(action: ClassificationAction): void {
        const alreadyExists = this.actions.some(
            (el) => el.getTypeCode() === action.getTypeCode(),
        );
        if (!alreadyExists) {
            this.actions.push(action);
        }
    }

    public removeClassficationAction(action: ClassificationAction): void {
        this.actions = this.actions.filter(
            (el) => el.getTypeCode() !== action.getTypeCode(),
        );
    }

    serialize(object: ProjectMlSettingsToJson): ProjectMlSettingsToJson {
        const retObject = object;
        retObject.actions = this.actions.map(
            (el) => el.jsonSerialize() as ClassificationActionToJson,
        );
        return retObject;
    }
}
