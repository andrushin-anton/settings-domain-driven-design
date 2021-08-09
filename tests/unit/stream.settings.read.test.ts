import { readStreamSettings } from '@src/application/stream-settings-read-actions';
import { InMemoryStreamSettingsRepository } from '@src/infrastructure/stream/in-memory-stream-settings-repository';

describe('Testing stream settings', () => {
    test('test reading stream settings', async () => {
        const streamSettingsRepository = new InMemoryStreamSettingsRepository();
        const result = await readStreamSettings(
            '1234567_stream',
            streamSettingsRepository,
        );
        expect(result.id).toEqual('1234567_stream');
        expect(result.address).toEqual('https://facebook.com/icuc');
        expect(result.owned).toEqual(true);
    });
});
