import { PublisherRepository } from '@src/domain/event/publisher-repository';
import {
    CategoryToJson,
    CategoriesEventMessage,
    Category,
    ProjectCategoriesRepository,
    ProjectId,
} from '@src/domain/project';

export async function saveProjectCategories(
    project: string,
    projectCategories: Category[],
    projectCategoryRepository: ProjectCategoriesRepository,
    pub: PublisherRepository,
): Promise<void> {
    await projectCategoryRepository.saveCategories(
        new ProjectId(project),
        projectCategories,
    );

    const serialisedCategories = projectCategories.map(
        (el) => el.jsonSerialize() as CategoryToJson,
    );
    const event: CategoriesEventMessage = {
        message: serialisedCategories,
    };
    pub.publish('user.project-categories.modified', event);
}
