import {
    Project,
    ProjectId,
} from '@src/domain/project';

export interface ProjectRepository {
    readProjectById(projectId: ProjectId): Promise<Project> | Project;
    readProjectsByIds(projectIds: Array<ProjectId>): Promise<Array<Project>> | Array<Project>;
    readProjects(limit: number, offset: number): Promise<Array<Project>> | Array<Project>;

    saveProject(project: Project): Promise<void> | void;
}
