import {
    ProjectId,
    ProjectChangeLog,
} from '@src/domain/project';

export interface ProjectChangeLogRepository {
    readProjectChangeLog(
        projectId: ProjectId
    ): Promise<Array<ProjectChangeLog>> | Array<ProjectChangeLog>;

    saveChangeLog(projectChangeLog: ProjectChangeLog): Promise<void> | void;
}
