import { readStream, readStreams, readStreamsByIds } from '@src/application/stream-read-action';
import { InMemoryStreamRepository } from '@src/infrastructure/stream/in-memory-stream-repository';

describe('Testing stream functionality', () => {
    test('testing reading stream by id', async () => {
        const streamRepository = new InMemoryStreamRepository();
        const result = await readStream(
            '1234567_stream',
            streamRepository,
        );
        expect(result.id).toEqual('1234567_stream');
        expect(result.name).toEqual('Very Cool!');
        expect(result.code).toEqual('1234567_cool');
    });

    test('testing reading streams by their ids', async () => {
        const streamRepository = new InMemoryStreamRepository();
        const result = await readStreamsByIds(
            ['1234567_stream', '7654321_stream'],
            streamRepository,
        );
        expect(result.length).toEqual(2);
        const stream = result[1];
        expect(stream.id).toEqual('7654321_stream');
        expect(stream.name).toEqual('Even Cooler!');
        expect(stream.code).toEqual('7654321_cool');
    });

    test('testing reading streams', async () => {
        const streamRepository = new InMemoryStreamRepository();
        const limit = 2;
        const offset = 0;
        const result = await readStreams(
            '1234567',
            limit,
            offset,
            streamRepository,
        );
        expect(result.length).toEqual(2);
        const stream = result[1];
        expect(stream.id).toEqual('7654321_stream');
        expect(stream.name).toEqual('Even Cooler!');
        expect(stream.code).toEqual('7654321_cool');
    });
});