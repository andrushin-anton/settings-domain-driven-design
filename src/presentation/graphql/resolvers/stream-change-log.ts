import {
    Ctx,
    Arg,
    Resolver,
    Mutation,
} from 'type-graphql';
import { StreamId } from '@src/domain/stream/stream-id';
import { StreamChangeLog as DomainStreamChangeLog } from '@src/domain/stream/changelog/stream-change-log';
import { saveStreamLogs } from '@src/application/stream-change-log-save-action';
import { AuthorId } from '@src/domain/stream/changelog/author-id';
import { AuthorName } from '@src/domain/stream/changelog/author-name';
import { ChangeLogAuthor } from '@src/domain/stream/changelog/change-log-author';
import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { Utilities } from '@src/common';
import { Context } from '../types/context';
import { ChangeLogInput } from '../type-defs/inputs/change-log-input';
import { StreamChangeLog } from '../type-defs/schemas/stream-change-log';

@Resolver(() => StreamChangeLog)
export class StreamChangeLogResolver {
    @Mutation(() => StreamChangeLog)
    async saveStreamLogs(
        @Arg('input') input: ChangeLogInput, @Ctx() ctx: Context,
    ): Promise<StreamChangeLog> {
        const createdAt = Utilities.nowInDatabaseFormat();
        const {
            id,
            authorId,
            authorName,
            value,
        } = input;

        const streamChangeLog = new DomainStreamChangeLog(
            new StreamId(id),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            value,
            new DateTimeValueObject(
                createdAt,
            ),
        );
        await saveStreamLogs(
            streamChangeLog,
            ctx.dataProvider.streamChangeLogRepository(),
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
