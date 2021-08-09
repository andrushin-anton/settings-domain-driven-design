import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { AuthorId } from '@src/domain/stream/changelog/author-id';
import { AuthorName } from '@src/domain/stream/changelog/author-name';
import { ChangeLogAuthor } from '@src/domain/stream/changelog/change-log-author';
import { StreamChangeLog } from '@src/domain/stream/changelog/stream-change-log';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamId } from '@src/domain/stream/stream-id';

export class InMemoryStreamChangeLogRepository implements StreamChangeLogRepository {
    private changelog: StreamChangeLog[] = [
        new StreamChangeLog(
            new StreamId('1234567_stream'),
            new ChangeLogAuthor(
                new AuthorId('123'), new AuthorName('Author First Name'),
            ),
            /* eslint-disable-next-line */
            'added something...' as any,
            new DateTimeValueObject('2021-03-31 12:12:12'),
        ),
        new StreamChangeLog(
            new StreamId('1234567_stream'),
            new ChangeLogAuthor(
                new AuthorId('123'), new AuthorName('Author First Name'),
            ),
            /* eslint-disable-next-line */
            'changed something...' as any,
            new DateTimeValueObject('2021-03-31 18:18:18'),
        ),
    ];

    readStreamChangeLog(streamId: StreamId): StreamChangeLog[] {
        const streamChangeLog = this.changelog.filter(
            (el) => el.getId().equals(streamId),
        );
        return streamChangeLog;
    }

    saveChangeLog(streamChangeLog: StreamChangeLog): void {
        this.changelog.push(streamChangeLog);
    }
}

export const inMemoryStreamChangeLogRepository = new InMemoryStreamChangeLogRepository();
