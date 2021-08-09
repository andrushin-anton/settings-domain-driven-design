import { readProjectSettings } from "@src/application/project-settings-read-actions";
import { saveProjectSettings } from "@src/application/project-settings-save-actions";
import { InMemoryProjectSettingsRepository } from "@src/infrastructure";
import { InMemoryPublisher } from "@src/infrastructure/event/in-memory-publisher";

describe('Tesing saving project settings', () => {
    test('testing saving project settings', async () => {
        const projectSettingsRepository = new InMemoryProjectSettingsRepository();
        const publisher = new InMemoryPublisher();
        await saveProjectSettings(
            '1234567',
            false,
            false,
            true,
            false,
            projectSettingsRepository,
            publisher,
        );
        // read the updated project to check the fields
        const result = await readProjectSettings(
            '1234567',
            projectSettingsRepository,
        );
        expect(result.id).toEqual('1234567');
        expect(result.rollup).toEqual(false);
        expect(result.asset).toEqual(false);
        expect(result.trackOnly).toEqual(true);
        expect(result.brndEntriesOnly).toEqual(false);

        // check if the action published a project settings updated event
        const lastEvent = publisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        const { id, rollup, trackOnly } = message;
        expect(eventName).toEqual('user.project-settings.modified');
        expect(id).toEqual('1234567');
        expect(rollup).toEqual(false);
        expect(trackOnly).toEqual(true);
    });
});
