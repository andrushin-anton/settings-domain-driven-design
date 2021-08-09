import { CategoryToJson, ProjectCategoriesRepository, ProjectId } from '@src/domain/project';

export async function readProjectCategories(
    project: string,
    projectCategoriesRepository: ProjectCategoriesRepository,
): Promise<CategoryToJson[]> {
    const projectId = new ProjectId(project);
    const projectCategories = await projectCategoriesRepository.readCategories(projectId);
    const projectCategoriesDesirialised = projectCategories.map(
        (el) => el.jsonSerialize() as CategoryToJson,
    );
    return projectCategoriesDesirialised;
}
