import { ProjectId } from '@src/domain/project';
import { ProjectChangeLogToJson } from '@src/domain/project/changelog/project-change-log';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';

export async function readProjectChangeLog(
    project: string,
    projectChangeLogRepository: ProjectChangeLogRepository,
): Promise<ProjectChangeLogToJson[]> {
    const results = await projectChangeLogRepository.readProjectChangeLog(new ProjectId(project));
    const desirialisedResults = results.map(
        (el) => el.jsonSerialize() as ProjectChangeLogToJson,
    );
    return desirialisedResults;
}
