import { NotFoundError } from '@src/common';
import {
    Project,
    ProjectId,
    ProjectName,
    ProjectRepository,
    ProjectSla,
    ProjectStatus,
    SalesForcePid,
} from '@src/domain/project';

export class InMemoryProjectRepository implements ProjectRepository {
    private projects: Array<Project> = [
        new Project(
            new ProjectId('1234567'),
            new ProjectName('First'),
            new SalesForcePid('PID12345'),
            new ProjectStatus('ACTIVE'),
            new ProjectSla('HOUR'),
        ),
        new Project(
            new ProjectId('7654321'),
            new ProjectName('Second'),
            new SalesForcePid('PID54321'),
            new ProjectStatus('PAUSED'),
            new ProjectSla('4 HOURS'),
        ),
        new Project(
            new ProjectId('88888888'),
            new ProjectName('Eight'),
            new SalesForcePid('PID54321'),
            new ProjectStatus('PAUSED'),
            new ProjectSla('4 HOURS'),
        ),
    ];

    readProjectById(projectId: ProjectId): Project {
        const foundProjectArr: Array<Project> = this.projects.filter(
            (el) => el.getId().equals(projectId),
        );
        if (!foundProjectArr.length) {
            throw new NotFoundError();
        }
        return foundProjectArr[0];
    }

    readProjectsByIds(projectIds: ProjectId[]): Project[] {
        const foundProjects: Project[] = [];
        projectIds.forEach((projectId) => {
            const foundProject = this.projects.filter(
                (el) => el.getId().equals(projectId),
            );
            if (foundProject.length) {
                foundProjects.push(foundProject[0]);
            }
        });
        return foundProjects;
    }

    readProjects(limit: number, offset: number): Project[] {
        return this.projects.slice(offset, limit);
    }

    saveProject(project: Project): void {
        let foundProject = false;
        let index = 0;
        this.projects.forEach((object) => {
            if (project.getId().equals(object.getId())) {
                foundProject = true;
                // need to update it
                this.projects[index] = project;
                return;
            }
            index += 1;
        });
        if (!foundProject) {
            // need to save it
            this.projects.push(project);
        }
    }
}
