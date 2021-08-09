import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import {
    AuthorId,
    AuthorName,
    ChangeLogAuthor,
    ProjectId,
} from '@src/domain/project';
import { ProjectChangeLog } from '@src/domain/project/changelog/project-change-log';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';

export class InMemoryProjectChangeLogRepository implements ProjectChangeLogRepository {
    private changelog: ProjectChangeLog[] = [
        new ProjectChangeLog(
            new ProjectId('1234567'),
            new ChangeLogAuthor(
                new AuthorId('123'), new AuthorName('Author First Name'),
            ),
            /* eslint-disable-next-line */
            'added something...' as any,
            new DateTimeValueObject('2021-03-31 12:12:12'),
        ),
        new ProjectChangeLog(
            new ProjectId('1234567'),
            new ChangeLogAuthor(
                new AuthorId('123'), new AuthorName('Author First Name'),
            ),
            /* eslint-disable-next-line */
            'changed something...' as any,
            new DateTimeValueObject('2021-03-31 18:18:18'),
        ),
    ];

    readProjectChangeLog(projectId: ProjectId): ProjectChangeLog[] {
        const projectChangeLog = this.changelog.filter(
            (el) => el.getId().equals(projectId),
        );
        return projectChangeLog;
    }

    saveChangeLog(projectChangeLog: ProjectChangeLog): void {
        this.changelog.push(projectChangeLog);
    }
}

export const inMemoryProjectChangeLogRepository = new InMemoryProjectChangeLogRepository();
