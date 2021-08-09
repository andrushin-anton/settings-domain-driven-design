import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { PublisherRepository } from '@src/domain/event/publisher-repository';
import {
    AuthorId,
    AuthorName,
    ChangeLogAuthor,
    Project,
    ProjectChangeLog,
    ProjectEventMessage,
    ProjectId,
    ProjectName,
    ProjectRepository,
    ProjectSla,
    ProjectStatus,
    ProjectToJson,
    SalesForcePid,
} from '@src/domain/project';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';
import { saveProjectLogs } from './project-change-log-save-action';

export async function createProject(
    projectRepository: ProjectRepository,
    name: string,
    salesforcePid: string,
    status: string,
    sla: string,
    pub: PublisherRepository,
    projectChangeLogRepository: ProjectChangeLogRepository,
    authorId: string,
    authorName: string,
): Promise<ProjectToJson> {
    const project = new Project(
        new ProjectId(),
        new ProjectName(name),
        new SalesForcePid(salesforcePid),
        new ProjectStatus(status),
        new ProjectSla(sla),
    );
    // save the project to the db
    await projectRepository.saveProject(project);
    const serialised = project.jsonSerialize() as ProjectToJson;

    // publish a new event
    const event: ProjectEventMessage = {
        message: serialised,
    };
    pub.publish('user.project.created', event);

    // save recond to the project changelog
    await saveProjectLogs(
        new ProjectChangeLog(
            project.getId(),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            JSON.stringify(serialised),
            new DateTimeValueObject(
                new Date().toDateString(),
            ),
        ),
        projectChangeLogRepository,
    );
    return serialised;
}

export async function updateProject(
    projectRepository: ProjectRepository,
    projectId: string,
    name: string,
    salesforcePid: string,
    status: string,
    sla: string,
    pub: PublisherRepository,
    projectChangeLogRepository: ProjectChangeLogRepository,
    authorId: string,
    authorName: string,
): Promise<ProjectToJson> {
    const project = new Project(
        new ProjectId(projectId),
        new ProjectName(name),
        new SalesForcePid(salesforcePid),
        new ProjectStatus(status),
        new ProjectSla(sla),
    );
    // save the updates to the db
    await projectRepository.saveProject(project);
    const serialised = project.jsonSerialize() as ProjectToJson;

    // publish an update event
    const event: ProjectEventMessage = {
        message: serialised,
    };
    pub.publish('user.project.modified', event);

    // save recond to the project changelog
    await saveProjectLogs(
        new ProjectChangeLog(
            project.getId(),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            JSON.stringify(serialised),
            new DateTimeValueObject(
                new Date().toDateString(),
            ),
        ),
        projectChangeLogRepository,
    );

    return serialised;
}
