import { readProjectMlSettings, readProjectSettings } from '@src/application/project-settings-read-actions';
import { InMemoryProjectSettingsRepository } from '@src/infrastructure';

describe('Testing reading project settings', () => {
    test('reading project settings', async () => {
        const inMemoryProjectSettingsRepository = new InMemoryProjectSettingsRepository();
        const result = await readProjectSettings(
            '1234567',
            inMemoryProjectSettingsRepository,
        );
        expect(result.id).toEqual('1234567');
        expect(result.rollup).toEqual(true);
        expect(result.asset).toEqual(false);
        expect(result.trackOnly).toEqual(false);
        expect(result.brndEntriesOnly).toEqual(false);
    });

    test('reading project ML settings', async () => {
        const inMemoryProjectSettingsRepository = new InMemoryProjectSettingsRepository();
        const result = await readProjectMlSettings(
            '1234567',
            inMemoryProjectSettingsRepository,
        );
        const actions = result.actions;
        expect(result.id).toEqual('1234567');
        expect(actions.length).toEqual(2);
        const { typeCode, active, value } = actions[0];
        expect(typeCode).toEqual('WATCHWORD');
        expect(active).toEqual(true);
        expect(value).toEqual('');
    });
});
