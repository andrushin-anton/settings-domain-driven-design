import { createProject, updateProject } from "@src/application/project-save-actions";
import {
    inMemoryProjectChangeLogRepository,
    InMemoryProjectRepository,
} from "@src/infrastructure";
import { InMemoryPublisher } from "@src/infrastructure/event/in-memory-publisher";

describe('Testing creating and updating projects', () => {
    test('create a new project', async () => {
        const inMemoryProjectRepository = new InMemoryProjectRepository();
        const inMemoryPublisher = new InMemoryPublisher();
        const result = await createProject(
            inMemoryProjectRepository,
            'Brand new project',
            'PID1111',
            'ACTIVE',
            'HOUR',
            inMemoryPublisher,
            inMemoryProjectChangeLogRepository,
            '123-123-123',
            'Author Name',
        );
        // check if the project was created by checking some of the returned fields
        expect(result.name).toEqual('Brand new project');
        // check if the action published a new project created event
        const lastEvent = inMemoryPublisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        expect(eventName).toEqual('user.project.created');
        expect(message.hasOwnProperty('name')).toEqual(true);
        expect(message.name).toEqual('Brand new project');
    });

    test('update existing project', async () => {
        const inMemoryProjectRepository = new InMemoryProjectRepository();
        const inMemoryPublisher = new InMemoryPublisher();
        const result = await updateProject(
            inMemoryProjectRepository,
            '1234567',
            'Updated 1234567',
            'PID1111',
            'PAUSED',
            'HOUR',
            inMemoryPublisher,
            inMemoryProjectChangeLogRepository,
            '123-123-123',
            'Author Name',
        );
        // check if the project was updated by checking some of the returned fields
        expect(result.name).toEqual('Updated 1234567');
        // check if the action published a project updated event
        const lastEvent = inMemoryPublisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        expect(eventName).toEqual('user.project.modified');
        expect(message.hasOwnProperty('status')).toEqual(true);
        expect(message.status).toEqual('PAUSED');
    });
});
