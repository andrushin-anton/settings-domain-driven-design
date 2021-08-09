import { PublisherRepository } from '@src/domain/event/publisher-repository';
import {
    StreamSettings,
    StreamSettingsEventMessage,
    StreamSettingsToJson,
} from '@src/domain/stream/settings/stream-settings';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamId } from '@src/domain/stream/stream-id';

export async function saveStreamSettings(
    streamId: string,
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
    streamSettingsRepo: StreamSettingsRepository,
    pub: PublisherRepository,
): Promise<void> {
    const streamSettings = new StreamSettings(
        new StreamId(streamId),
        address,
        owned,
        otherBrandReply,
        translate,
        debug,
        data,
        ignoreMentions,
        ignoreInstagramTags,
        ignoreInstagramMentions,
        instagramAdsEnabled,
        facebookAdsEnabled,
    );
    await streamSettingsRepo.saveStreamSettings(streamSettings);

    const event: StreamSettingsEventMessage = {
        message: streamSettings.jsonSerialize() as StreamSettingsToJson,
    };
    pub.publish('user.stream-settings.modified', event);
}
