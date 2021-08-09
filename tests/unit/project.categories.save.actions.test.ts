import { readProjectCategories } from "@src/application/project-categories-read-action";
import { saveProjectCategories } from "@src/application/project-categories-save-action";
import {
    Category,
    CategoryCode,
    CategoryDescription,
    CategoryDisplayType,
    CategoryId,
    CategoryItem,
    CategoryItemCode,
    CategoryItemDescription,
    CategoryType,
    CategoryWidth,
    ProjectId
} from "@src/domain/project";
import { InMemoryProjectCategoryRepository } from "@src/infrastructure";
import { InMemoryPublisher } from '@src/infrastructure/event/in-memory-publisher';

describe('Tetsing saving project caregories', () => {
    test('saving project categories', async () => {
        const inMemoryProjectCategoriesRepository = new InMemoryProjectCategoryRepository();
        const inMemoryPublisher = new InMemoryPublisher();
        const categories: Category[] = [
            new Category(
                new ProjectId('1234567'),
                new CategoryId('new-category-id'),
                new CategoryCode('SENTIMENT'),
                new CategoryDescription('updated category description'),
                '#ffff',
                new CategoryType('MULTIPLE'),
                new CategoryWidth('MEDIUM'),
                new CategoryDisplayType('BUTTON'),
                false,
                false,
                true,
                false,
                false,
                true,
                [
                    new CategoryItem(
                        new CategoryId('1234'),
                        new CategoryItemCode('APPROVE'),
                        new CategoryItemDescription('approves item'),
                    ),
                ],
            ),
        ];
        await saveProjectCategories(
            '1234567',
            categories,
            inMemoryProjectCategoriesRepository,
            inMemoryPublisher,
        );

        // read the project categories
        const result = await readProjectCategories(
            '1234567',
            inMemoryProjectCategoriesRepository,
        );
        expect(result.length).toEqual(1);
        const { code, description, type } = result[0];
        expect(code).toEqual('SENTIMENT');
        expect(description).toEqual('updated category description');
        expect(type).toEqual('MULTIPLE');

        // check if the action published a project category updated event
        const lastEvent = inMemoryPublisher.getLastEvent();
        const eventName = lastEvent.event;
        const payload = JSON.parse(lastEvent.payload);
        expect(payload.hasOwnProperty('message')).toEqual(true);
        const message = payload.message;
        const { id, projectId, width } = message[0];
        expect(eventName).toEqual('user.project-categories.modified');
        expect(id).toEqual('new-category-id');
        expect(projectId).toEqual('1234567');
        expect(width).toEqual('MEDIUM');
    });
});
