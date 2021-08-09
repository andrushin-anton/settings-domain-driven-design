import { db } from '@src/common/mysql';
import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { ChangeLogAuthor } from '@src/domain/stream/changelog/change-log-author';
import { AuthorId } from '@src/domain/stream/changelog/author-id';
import { AuthorName } from '@src/domain/stream/changelog/author-name';
import { StreamChangeLog } from '@src/domain/stream/changelog/stream-change-log';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamId } from '@src/domain/stream/stream-id';

interface StreamChangeLogDbResponse {
    stream_id: string,
    author_id: string,
    author_name: string,
    value: string,
    created: string,
}

export class MysqlStreamChangeLogRepository implements StreamChangeLogRepository {
    async readStreamChangeLog(streamId: StreamId): Promise<StreamChangeLog[]> {
        const rows = await db.getall<StreamChangeLogDbResponse>('SELECT * FROM stream_change_log WHERE stream_id = ? ORDER BY created DESC', [streamId.getValue()]);
        const result = rows.map((el) => (
            new StreamChangeLog(
                new StreamId(el.stream_id),
                new ChangeLogAuthor(
                    new AuthorId(el.author_id),
                    new AuthorName(el.author_name),
                ),
                el.value,
                new DateTimeValueObject(el.created),
            )));
        return result;
    }

    async saveChangeLog(streamChangeLog: StreamChangeLog): Promise<void> {
        const query = `
            INSERT INTO stream_change_log 
                (stream_id,author_id,author_name,value,created)
            VALUES(?,?,?,?,NOW())
        `;
        const bindParams = [
            streamChangeLog.getId().getValue(),
            streamChangeLog.getAuthor().getAuthorId().getValue(),
            streamChangeLog.getAuthor().getAuthorName().getValue(),
            streamChangeLog.getValue(),
        ];
        await db.execute(query, bindParams);
    }
}
