import {
    ProjectId,
    Category,
} from '@src/domain/project';

export interface ProjectCategoriesRepository {
    readCategories(projectId: ProjectId): Promise<Category[]> | Category[];

    saveCategories(projectId: ProjectId, projectCategories: Category[]): Promise<void> | void;
}
