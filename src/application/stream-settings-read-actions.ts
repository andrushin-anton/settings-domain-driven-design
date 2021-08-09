import { StreamSettingsToJson } from '@src/domain/stream/settings/stream-settings';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamId } from '@src/domain/stream/stream-id';

export async function readStreamSettings(
    streamId: string,
    streamSettingsRepo: StreamSettingsRepository,
): Promise<StreamSettingsToJson> {
    const settings = await streamSettingsRepo.readStreamSettings(new StreamId(streamId));
    const settingsDeserialised = settings.jsonSerialize() as StreamSettingsToJson;
    return settingsDeserialised;
}
