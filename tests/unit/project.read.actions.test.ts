import {
    readProject,
    readProjects,
    readProjectsByIds,
} from '@src/application/project-read-action';
import { InMemoryProjectRepository } from '@src/infrastructure';

describe('Test reading projects from project actions', () => {
    test('reading project by id', async () => {
        const inMemoryProjectRepository = new InMemoryProjectRepository();
        const result = await readProject(
            '1234567',
            inMemoryProjectRepository,
        );
        expect(result.id).toEqual('1234567');
        expect(result.name).toEqual('First');
    });

    test('reading projects by ids', async () => {
        const inMemoryProjectRepository = new InMemoryProjectRepository();
        const result = await readProjectsByIds(
            ['1234567', '7654321'],
            inMemoryProjectRepository,
        );
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual('First');
        expect(result[1].name).toEqual('Second');
    });

    test('reading projects', async () => {
        const inMemoryProjectRepository = new InMemoryProjectRepository();
        const limit = 2;
        const offset = 0;
        const result = await readProjects(
            limit,
            offset,
            inMemoryProjectRepository,
        );
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual('First');
        expect(result[1].name).toEqual('Second');
    });
});
