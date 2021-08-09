import { readStreamSettings } from '@src/application/stream-settings-read-actions';
import { saveStreamSettings } from '@src/application/stream-settings-save-actions';
import { InMemoryPublisher } from '@src/infrastructure/event/in-memory-publisher';
import { InMemoryStreamSettingsRepository } from '@src/infrastructure/stream/in-memory-stream-settings-repository';

describe('Testing saving stream settings', () => {
    test('test to save stream settings', async () => {
        const streamSettingsRepository = new InMemoryStreamSettingsRepository();
        const publisher = new InMemoryPublisher();
        await saveStreamSettings(
            '1234567_stream',
            'https://blah.com',
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
            streamSettingsRepository,
            publisher,
        );
        // read the settings to check if the fields were updated
        const result = await readStreamSettings(
            '1234567_stream',
            streamSettingsRepository,
        );
        expect(result.id).toEqual('1234567_stream');
        expect(result.address).toEqual('https://blah.com');
        expect(result.owned).toEqual(true);
        expect(result.data).toEqual('');

        // check if the action published stream settings updated event
        const lastEvent = publisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        expect(eventName).toEqual('user.stream-settings.modified');
        expect(message.hasOwnProperty('id')).toEqual(true);
        expect(message.id).toEqual(result.id);
        expect(message.hasOwnProperty('address')).toEqual(true);
        expect(message.address).toEqual('https://blah.com');
    });
});
