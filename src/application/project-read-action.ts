import { ProjectToJson, ProjectId, ProjectRepository } from '@src/domain/project';

export async function readProject(
    projectId: string,
    projectRepository: ProjectRepository,
): Promise<ProjectToJson> {
    const result = await projectRepository.readProjectById(new ProjectId(projectId));
    const deserialedResult = result.jsonSerialize() as ProjectToJson;
    return deserialedResult;
}

export async function readProjectsByIds(
    projectIdsAsString: Array<string>,
    projectRepository: ProjectRepository,
): Promise<ProjectToJson[]> {
    const projectsIds: Array<ProjectId> = projectIdsAsString.map(
        (project) => new ProjectId(project),
    );
    const results = await projectRepository.readProjectsByIds(projectsIds);
    const deserialedResults = results.map(
        (el) => el.jsonSerialize() as ProjectToJson,
    );
    return deserialedResults;
}

export async function readProjects(
    limit: number,
    offset: number,
    projectRepository: ProjectRepository,
): Promise<ProjectToJson[]> {
    const results = await projectRepository.readProjects(limit, offset);
    const deserialedResults = results.map(
        (el) => el.jsonSerialize() as ProjectToJson,
    );
    return deserialedResults;
}
