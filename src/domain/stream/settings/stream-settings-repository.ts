import { StreamId } from '../stream-id';
import { StreamSettings } from './stream-settings';

export interface StreamSettingsRepository {
    readStreamSettings(streamId: StreamId): Promise<StreamSettings> | StreamSettings;

    saveStreamSettings(streamSettings: StreamSettings): Promise<void> | void;
}
