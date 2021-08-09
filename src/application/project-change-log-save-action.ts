import { ProjectChangeLog } from '@src/domain/project/changelog/project-change-log';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';

export async function saveProjectLogs(
    projectChangeLog: ProjectChangeLog,
    projectChageLogRepository: ProjectChangeLogRepository,
): Promise<void> {
    return projectChageLogRepository.saveChangeLog(projectChangeLog);
}
