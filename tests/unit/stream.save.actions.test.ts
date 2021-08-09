import { createStream, updateStream } from "@src/application/stream-save-actions";
import { InMemoryPublisher } from "@src/infrastructure/event/in-memory-publisher";
import { inMemoryStreamChangeLogRepository } from "@src/infrastructure/stream/in-memory-stream-change-log-repository";
import { InMemoryStreamRepository } from "@src/infrastructure/stream/in-memory-stream-repository";

describe('Tests saving streams', () => {
    test('testing creating a new stream', async () => {
        const streamRepository = new InMemoryStreamRepository();
        const publisher = new InMemoryPublisher();
        const result = await createStream(
            streamRepository,
            'Test new stream',
            'new-stream-code',
            '1234567',
            'FACEBOOK',
            'ACTIVE',
            publisher,
            inMemoryStreamChangeLogRepository,
            '123-123-123',
            'Author',
        );
        expect(result.code).toEqual('new-stream-code');
        expect(result.name).toEqual('Test new stream');
        // check if the action published stream updated event
        const lastEvent = publisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        expect(eventName).toEqual('user.stream.created');
        expect(message.hasOwnProperty('id')).toEqual(true);
        expect(message.id).toEqual(result.id);
        expect(message.hasOwnProperty('status')).toEqual(true);
        expect(message.status).toEqual('ACTIVE');
    });

    test('testing updating an existing stream', async () => {
        const streamRepository = new InMemoryStreamRepository();
        const publisher = new InMemoryPublisher();
        const result = await updateStream(
            streamRepository,
            '1234567_stream',
            'Updated!',
            'updated-stream-code',
            '1234567',
            'FACEBOOK',
            'ACTIVE',
            publisher,
            inMemoryStreamChangeLogRepository,
            '123-123-123',
            'Author',
        );
        expect(result.code).toEqual('updated-stream-code');
        expect(result.name).toEqual('Updated!');
        // check if the action published stream updated event
        const lastEvent = publisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        expect(eventName).toEqual('user.stream.modified');
        expect(message.hasOwnProperty('id')).toEqual(true);
        expect(message.id).toEqual(result.id);
        expect(message.hasOwnProperty('status')).toEqual(true);
        expect(message.status).toEqual('ACTIVE');
    });
});