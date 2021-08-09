import { NotFoundError } from '@src/common';
import { StreamSettings } from '@src/domain/stream/settings/stream-settings';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamId } from '@src/domain/stream/stream-id';

export class InMemoryStreamSettingsRepository implements StreamSettingsRepository {
    private streamSettings: StreamSettings[] = [
        new StreamSettings(
            new StreamId('1234567_stream'),
            'https://facebook.com/icuc',
            true,
            false,
            false,
            true,
            '',
            true,
            true,
            true,
            true,
            true,
        ),
        new StreamSettings(
            new StreamId('7654321_stream'),
            'https://facebook.com/icuc',
            true,
            false,
            false,
            true,
            '',
            true,
            true,
            true,
            true,
            true,
        ),
    ];

    readStreamSettings(streamId: StreamId): StreamSettings {
        const foundStreamSettingsArr: StreamSettings[] = this.streamSettings.filter(
            (el) => el.getId().equals(streamId),
        );
        if (!foundStreamSettingsArr.length) {
            throw new NotFoundError();
        }
        return foundStreamSettingsArr[0];
    }

    saveStreamSettings(streamSettings: StreamSettings): void {
        let foundStreamSettings = false;
        let index = 0;
        /* eslint-disable-next-line */
        for (let object of this.streamSettings) {
            if (streamSettings.getId().equals(object.getId())) {
                foundStreamSettings = true;
                // need to update it
                this.streamSettings[index] = streamSettings;
                break;
            }
            index += 1;
        }
        if (!foundStreamSettings) {
            // need to save it
            this.streamSettings.push(streamSettings);
        }
    }
}
