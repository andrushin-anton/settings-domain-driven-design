import { Entity } from '@src/domain/basic';
import { StreamId } from '../stream-id';

export interface StreamSettingsToJson {
    id: string,
    address: string,
    owned: boolean,
    otherBrandReply: boolean,
    translate: boolean,
    debug: boolean,
    data: string,
    ignoreMentions: boolean,
    ignoreInstagramTags: boolean,
    ignoreInstagramMentions: boolean,
    instagramAdsEnabled: boolean,
    facebookAdsEnabled: boolean,
}

export interface StreamSettingsEventMessage {
    message: StreamSettingsToJson,
}

export class StreamSettings extends Entity {
    private address: string;

    private owned: boolean;

    private otherBrandReply: boolean;

    private translate: boolean;

    private debug: boolean;

    private data: string;

    private ignoreMentions: boolean;

    private ignoreInstagramTags: boolean;

    private ignoreInstagramMentions: boolean;

    private instagramAdsEnabled: boolean;

    private facebookAdsEnabled: boolean;

    public constructor(
        streamId: StreamId,
        address: string,
        owned: boolean,
        otherBrandReply: boolean,
        translate: boolean,
        debug: boolean,
        data: string,
        ignoreMentions: boolean,
        ignoreInstagramTags: boolean,
        ignoreInstagramMentions: boolean,
        instagramAdsEnabled: boolean,
        facebookAdsEnabled: boolean,
    ) {
        super(streamId);
        this.address = address;
        this.owned = owned;
        this.otherBrandReply = otherBrandReply;
        this.translate = translate;
        this.debug = debug;
        this.data = data;
        this.ignoreMentions = ignoreMentions;
        this.ignoreInstagramMentions = ignoreInstagramMentions;
        this.ignoreInstagramTags = ignoreInstagramTags;
        this.instagramAdsEnabled = instagramAdsEnabled;
        this.facebookAdsEnabled = facebookAdsEnabled;
    }

    public getAddress(): string {
        return this.address;
    }

    public isOwned(): boolean {
        return this.owned;
    }

    public isOtherBrandReply(): boolean {
        return this.otherBrandReply;
    }

    public isTransalte(): boolean {
        return this.translate;
    }

    public isDebug(): boolean {
        return this.debug;
    }

    public getData(): string {
        return this.data;
    }

    public isIgnoreMentions(): boolean {
        return this.ignoreMentions;
    }

    public isIgnoreInstagramMentions(): boolean {
        return this.ignoreInstagramMentions;
    }

    public isIgnoreInstagramTags(): boolean {
        return this.ignoreInstagramTags;
    }

    public isInstagramAdsEnabled(): boolean {
        return this.instagramAdsEnabled;
    }

    public isFacebookAdsEnabled(): boolean {
        return this.facebookAdsEnabled;
    }

    serialize(object: StreamSettingsToJson): StreamSettingsToJson {
        const retObject = object;
        retObject.address = this.address;
        retObject.owned = this.owned;
        retObject.otherBrandReply = this.otherBrandReply;
        retObject.translate = this.translate;
        retObject.debug = this.debug;
        retObject.data = this.data;
        retObject.ignoreMentions = this.ignoreMentions;
        retObject.ignoreInstagramMentions = this.ignoreInstagramMentions;
        retObject.ignoreInstagramTags = this.ignoreInstagramTags;
        retObject.instagramAdsEnabled = this.instagramAdsEnabled;
        retObject.facebookAdsEnabled = this.facebookAdsEnabled;
        return retObject;
    }
}
