import { NotFoundError } from '@src/common';
import { db } from '@src/common/mysql';
import {
    Project,
    ProjectId,
    ProjectName,
    ProjectRepository,
    ProjectSla,
    ProjectStatus,
    SalesForcePid,
} from '@src/domain/project';

interface ProjectDbResponse {
    id: string,
    name: string,
    sales_force_pid: string,
    status: string,
    sla: string,
}

export class MysqlProjectRepository implements ProjectRepository {
    async readProjectById(projectId: ProjectId): Promise<Project> {
        const row = await db.getrow<ProjectDbResponse>('SELECT * FROM project WHERE id = ? LIMIT 1', [projectId.getValue()]);
        if (!row) {
            throw new NotFoundError();
        }
        return this.convertDbResponseToProject(row);
    }

    async readProjectsByIds(projectIds: ProjectId[]): Promise<Project[]> {
        let paramNames = '';
        const params: string[] = [];
        projectIds.forEach((el) => {
            paramNames += (paramNames === '') ? '?' : ', ?';
            params.push(el.getValue());
        });
        const rows = await db.getall<ProjectDbResponse>(`SELECT * FROM project WHERE id IN(${paramNames})`, params);
        const result: Project[] = [];
        rows.forEach((row) => {
            result.push(
                this.convertDbResponseToProject(row),
            );
        });
        return result;
    }

    async readProjects(limit: number, offset: number): Promise<Project[]> {
        const rows = await db.getall<ProjectDbResponse>('SELECT * FROM project LIMIT ? OFFSET ?', [limit, offset]);
        const result: Project[] = [];
        rows.forEach((row) => {
            result.push(
                this.convertDbResponseToProject(row),
            );
        });
        return result;
    }

    async saveProject(project: Project): Promise<void> {
        const query = `
            INSERT INTO project 
                (id,name,sales_force_pid,status,sla)
            VALUES(?,?,?,?,?)
            ON DUPLICATE KEY UPDATE 
                name = VALUES(name),
                sales_force_pid = VALUES(sales_force_pid),
                status = VALUES(status),
                sla = VALUES(sla)
        `;
        const bindParams = [
            project.getId().getValue(),
            project.getName().getValue(),
            project.getSalesforcePid().getValue(),
            project.getStatus().getValue(),
            project.getSla().getValue(),
        ];
        await db.execute(query, bindParams);
    }

    private convertDbResponseToProject(row: ProjectDbResponse): Project {
        return new Project(
            new ProjectId(row.id),
            new ProjectName(row.name),
            new SalesForcePid(row.sales_force_pid),
            new ProjectStatus(row.status),
            new ProjectSla(row.sla),
        );
    }
}
