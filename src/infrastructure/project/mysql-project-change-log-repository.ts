import { db } from '@src/common/mysql';
import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import {
    ProjectId,
    ProjectChangeLog,
    ChangeLogAuthor,
    AuthorId,
    AuthorName,
} from '@src/domain/project';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';

interface ProjectChangeLogDbResponse {
    project_id: string,
    author_id: string,
    author_name: string,
    value: string,
    created: string,
}

export class MysqlProjectChangeLogRepository implements ProjectChangeLogRepository {
    async readProjectChangeLog(projectId: ProjectId): Promise<ProjectChangeLog[]> {
        const rows = await db.getall<ProjectChangeLogDbResponse>('SELECT * FROM project_change_log WHERE project_id = ? ORDER BY created DESC', [projectId.getValue()]);
        const result = rows.map((el) => (
            new ProjectChangeLog(
                new ProjectId(el.project_id),
                new ChangeLogAuthor(
                    new AuthorId(el.author_id),
                    new AuthorName(el.author_name),
                ),
                el.value,
                new DateTimeValueObject(el.created),
            )));
        return result;
    }

    async saveChangeLog(projectChangeLog: ProjectChangeLog): Promise<void> {
        const query = `
            INSERT INTO project_change_log 
                (project_id,author_id,author_name,value,created)
            VALUES(?,?,?,?,NOW())
        `;
        const bindParams = [
            projectChangeLog.getId().getValue(),
            projectChangeLog.getAuthor().getAuthorId().getValue(),
            projectChangeLog.getAuthor().getAuthorName().getValue(),
            projectChangeLog.getValue(),
        ];
        await db.execute(query, bindParams);
    }
}
