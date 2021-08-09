import { Entity } from '../basic';
import { ProjectId } from '../project';
import { StreamCode } from './stream-code';
import { StreamId } from './stream-id';
import { StreamName } from './stream-name';
import { StreamStatus } from './stream-status';
import { StreamType } from './stream-type';

export interface StreamToJson {
    id: string,
    name: string,
    code: string,
    projectId: string,
    type: string,
    status: string,
}

export interface StreamEventMessage {
    message: StreamToJson,
}

export class Stream extends Entity {
    private name: StreamName;

    private code: StreamCode;

    private projectId: ProjectId;

    private type: StreamType;

    private status: StreamStatus;

    public constructor(
        id: StreamId,
        name: StreamName,
        code: StreamCode,
        projectId: ProjectId,
        type: StreamType,
        status: StreamStatus,
    ) {
        super(id);
        this.name = name;
        this.code = code;
        this.projectId = projectId;
        this.type = type;
        this.status = status;
    }

    public getName(): StreamName {
        return this.name;
    }

    public getCode(): StreamCode {
        return this.code;
    }

    public getType(): StreamType {
        return this.type;
    }

    public getStatus(): StreamStatus {
        return this.status;
    }

    public getProjectId(): ProjectId {
        return this.projectId;
    }

    serialize(object: StreamToJson): StreamToJson {
        const retObject = object;
        retObject.name = this.name.getValue();
        retObject.code = this.code.getValue();
        retObject.status = this.status.getValue();
        retObject.projectId = this.projectId.getValue();
        retObject.type = this.type.getValue();
        return retObject;
    }
}
