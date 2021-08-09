import { readProjectCategories } from "@src/application/project-categories-read-action";
import { InMemoryProjectCategoryRepository } from "@src/infrastructure";

describe('Tetsing reading project caregories', () => {
    test('reading project categories', async () => {
        const inMemoryProjectCategoriesRepository = new InMemoryProjectCategoryRepository();
        const result = await readProjectCategories(
            '1234567',
            inMemoryProjectCategoriesRepository,
        );
        expect(result.length).toEqual(2);
        const { code, description, type } = result[0];
        expect(code).toEqual('APPROVED');
        expect(description).toEqual('approve category');
        expect(type).toEqual('SINGLE');
    });
});
