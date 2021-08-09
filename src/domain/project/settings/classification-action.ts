import { Entity } from '@src/domain/basic';
import { ProjectId } from '../project-id';

export interface ClassificationActionToJson {
    id: string;
    typeCode: string;
    active: boolean;
    value: string;
}

export class ClassificationAction extends Entity {
    private typeCode: string;

    private active: boolean;

    private value: string;

    public constructor(
        projectId: ProjectId,
        typeCode: string,
        active: boolean,
        value: string,
    ) {
        super(projectId);
        this.typeCode = typeCode;
        this.active = active;
        this.value = value;
    }

    public getTypeCode(): string {
        return this.typeCode;
    }

    public isActive(): boolean {
        return this.active;
    }

    public getValue(): string {
        return this.value;
    }

    serialize(object: ClassificationActionToJson): ClassificationActionToJson {
        const retObject = object;
        retObject.typeCode = this.typeCode;
        retObject.active = this.active;
        retObject.value = this.value;
        return retObject;
    }
}
