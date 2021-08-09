import { Entity } from '@src/domain/basic';
import { ProjectId } from '../project-id';

export interface ProjectSettingsToJson {
    id: string,
    rollup: boolean,
    asset: boolean,
    trackOnly: boolean,
    brndEntriesOnly: boolean,
}

export interface ProjectSettingsEventMessage {
    message: ProjectSettingsToJson,
}

export class ProjectSettings extends Entity {
    private rollup: boolean;

    private asset: boolean;

    private trackOnly: boolean;

    private brndEntriesOnly: boolean;

    public constructor(
        projectId: ProjectId,
        rollup: boolean,
        asset: boolean,
        trackOnly: boolean,
        brndEntriesOnly: boolean,
    ) {
        super(projectId);
        this.rollup = rollup;
        this.asset = asset;
        this.trackOnly = trackOnly;
        this.brndEntriesOnly = brndEntriesOnly;
    }

    public isRollup(): boolean {
        return this.rollup;
    }

    public isAsset(): boolean {
        return this.asset;
    }

    public isTrackOnly(): boolean {
        return this.trackOnly;
    }

    public isBrndEntriesOnly(): boolean {
        return this.brndEntriesOnly;
    }

    serialize(object: ProjectSettingsToJson): ProjectSettingsToJson {
        const retObject = object;
        retObject.rollup = this.rollup;
        retObject.asset = this.asset;
        retObject.trackOnly = this.trackOnly;
        retObject.brndEntriesOnly = this.brndEntriesOnly;
        return retObject;
    }
}
