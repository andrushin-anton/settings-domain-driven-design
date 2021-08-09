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
    ProjectCategoriesRepository,
    ProjectId,
} from '@src/domain/project';

export class InMemoryProjectCategoryRepository implements ProjectCategoriesRepository {
    private categories: Category[] = [
        new Category(
            new ProjectId('1234567'),
            new CategoryId('1234'),
            new CategoryCode('APPROVED'),
            new CategoryDescription('approve category'),
            '#ffff',
            new CategoryType('SINGLE'),
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
        new Category(
            new ProjectId('1234567'),
            new CategoryId('4321'),
            new CategoryCode('REJECTED'),
            new CategoryDescription('reject category'),
            '#gggg',
            new CategoryType('SINGLE'),
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
                    new CategoryId('4321'),
                    new CategoryItemCode('HIDE'),
                    new CategoryItemDescription('hides item'),
                ),
            ],
        ),
    ];

    readCategories(projectId: ProjectId): Category[] {
        const projectCategories = this.categories.filter(
            (el) => el.getProjectId().equals(projectId),
        );
        return projectCategories;
    }

    saveCategories(projectId: ProjectId, newCategories: Category[]): void {
        // if no categories
        if (!newCategories.length) {
            this.removeAllProjectCategories(projectId);
            return;
        }
        // add/update Category
        newCategories.forEach((newCategory) => {
            let index = 0;
            let foundCategory = false;
            this.categories.forEach((existingCategory) => {
                if (existingCategory.getProjectId().equals(projectId)) {
                    if (existingCategory.getId().equals(newCategory.getId())) {
                        // update it
                        this.categories[index] = newCategory;
                        foundCategory = true;
                        return;
                    }
                }
                index += 1;
            });
            if (!foundCategory) {
                // it is a new category, need to save it
                this.categories.push(newCategory);
            }
        });
        // remove the categories that are not in the newCategories but still in existingCategories
        const currentProjectCategories = this.categories.filter(
            (el) => el.getProjectId().equals(projectId),
        );
        /* eslint-disable-next-line */
        for (let currentCategory of currentProjectCategories) {
            const categoryExists = newCategories.some(
                (el) => el.getId().equals(currentCategory.getId()),
            );
            if (!categoryExists) {
                this.removeCategory(currentCategory);
            }
        }
    }

    removeAllProjectCategories(projectId: ProjectId): void {
        let index = 0;
        this.categories.forEach((existingCategory) => {
            if (projectId.equals(existingCategory.getProjectId())) {
                this.categories.splice(index, 1);
            }
            index += 1;
        });
    }

    removeCategory(category: Category): void {
        let index = 0;
        this.categories.forEach((existingCategory) => {
            if (category.getProjectId().equals(existingCategory.getProjectId())
            && category.getId().equals(existingCategory.getId())) {
                this.categories.splice(index, 1);
            }
            index += 1;
        });
    }
}
