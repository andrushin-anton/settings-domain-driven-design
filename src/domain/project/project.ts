import {
    ProjectId,
    ProjectName,
    SalesForcePid,
    ProjectStatus,
    ProjectSla,
} from '@src/domain/project';
import { Entity } from '@src/domain/basic';

export interface ProjectToJson {
    id: string,
    name: string,
    salesforcePid: string,
    status: string,
    sla: string,
}

export interface ProjectEventMessage {
    message: ProjectToJson,
}

export class Project extends Entity {
    private name: ProjectName;

    private salesforcePid: SalesForcePid;

    private status: ProjectStatus;

    private sla: ProjectSla;

    public constructor(
        id: ProjectId,
        name: ProjectName,
        salesforcePid: SalesForcePid,
        status: ProjectStatus,
        sla: ProjectSla,
    ) {
        super(id);
        this.name = name;
        this.salesforcePid = salesforcePid;
        this.status = status;
        this.sla = sla;
    }

    public getName(): ProjectName {
        return this.name;
    }

    public getSalesforcePid(): SalesForcePid {
        return this.salesforcePid;
    }

    public getStatus(): ProjectStatus {
        return this.status;
    }

    public getSla(): ProjectSla {
        return this.sla;
    }

    serialize(object: ProjectToJson): ProjectToJson {
        const retObject = object;
        retObject.name = this.name.getValue();
        retObject.salesforcePid = this.salesforcePid.getValue();
        retObject.status = this.status.getValue();
        retObject.sla = this.sla.getValue();
        return retObject;
    }
}
