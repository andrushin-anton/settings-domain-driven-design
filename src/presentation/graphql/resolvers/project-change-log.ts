import {
    Ctx,
    Arg,
    Resolver,
    Mutation,
} from 'type-graphql';
import { ProjectChangeLog as DomainProjectChangeLog } from '@src/domain/project/changelog/project-change-log';
import { saveProjectLogs } from '@src/application/project-change-log-save-action';
import {
    AuthorId,
    AuthorName,
    ChangeLogAuthor,
    ProjectId,
} from '@src/domain/project';
import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { Utilities } from '@src/common';
import { Context } from '../types/context';
import { ChangeLogInput } from '../type-defs/inputs/change-log-input';
import { ProjectChangeLog } from '../type-defs/schemas/project-change-log';

@Resolver(() => ProjectChangeLog)
export class ProjectChangeLogResolver {
    @Mutation(() => ProjectChangeLog)
    async saveProjectChangeLog(
        @Arg('input') input: ChangeLogInput, @Ctx() ctx: Context,
    ): Promise<ProjectChangeLog> {
        const createdAt = Utilities.nowInDatabaseFormat();
        const {
            id,
            authorId,
            authorName,
            value,
        } = input;

        const projectChangeLog = new DomainProjectChangeLog(
            new ProjectId(id),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            value,
            new DateTimeValueObject(
                createdAt,
            ),
        );
        await saveProjectLogs(
            projectChangeLog,
            ctx.dataProvider.projectChangeLogRepository(),
        );
        return {
            id,
            author: {
                id: authorId,
                name: authorName,
            },
            value,
            createdAt,
        };
    }
}
