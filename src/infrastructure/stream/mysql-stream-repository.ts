import { NotFoundError } from '@src/common';
import { db } from '@src/common/mysql';
import { ProjectId } from '@src/domain/project';
import { Stream } from '@src/domain/stream/stream';
import { StreamCode } from '@src/domain/stream/stream-code';
import { StreamId } from '@src/domain/stream/stream-id';
import { StreamName } from '@src/domain/stream/stream-name';
import { StreamRepository } from '@src/domain/stream/stream-repository';
import { StreamStatus } from '@src/domain/stream/stream-status';
import { StreamType } from '@src/domain/stream/stream-type';

interface StreamDbResponse {
    id: string,
    name: string,
    code: string,
    project_id: string,
    type: string,
    status: string,
}

export class MysqlStreamRepository implements StreamRepository {
    async readStreamById(streamId: StreamId): Promise<Stream> {
        const row = await db.getrow<StreamDbResponse>('SELECT * FROM stream WHERE id = ? LIMIT 1', [streamId.getValue()]);
        if (!row) {
            throw new NotFoundError();
        }
        return this.convertDbResponseToStream(row);
    }

    async readStreamsByIds(streamIds: StreamId[]): Promise<Stream[]> {
        let paramNames = '';
        const params: string[] = [];
        streamIds.forEach((el) => {
            paramNames += (paramNames === '') ? '?' : ', ?';
            params.push(el.getValue());
        });
        const rows = await db.getall<StreamDbResponse>(`SELECT * FROM stream WHERE id IN(${paramNames})`, params);
        const result: Stream[] = [];
        rows.forEach((row) => {
            result.push(
                this.convertDbResponseToStream(row),
            );
        });
        return result;
    }

    async readStreamsByProjectId(
        projectId: ProjectId,
        limit: number,
        offset: number,
    ): Promise<Stream[]> {
        const rows = await db.getall<StreamDbResponse>('SELECT * FROM stream WHERE project_id = ? LIMIT ? OFFSET ?', [projectId.getValue(), limit, offset]);
        const result: Stream[] = [];
        rows.forEach((row) => {
            result.push(
                this.convertDbResponseToStream(row),
            );
        });
        return result;
    }

    async saveStream(stream: Stream): Promise<void> {
        const query = `
            INSERT INTO stream 
                (id,name,code,project_id,type,status)
            VALUES(?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE 
                name = VALUES(name),
                code = VALUES(code),
                project_id = VALUES(project_id),
                type = VALUES(type),
                status = VALUES(status)
        `;
        const bindParams = [
            stream.getId().getValue(),
            stream.getName().getValue(),
            stream.getCode().getValue(),
            stream.getProjectId().getValue(),
            stream.getType().getValue(),
            stream.getStatus().getValue(),
        ];
        await db.execute(query, bindParams);
    }

    private convertDbResponseToStream(row: StreamDbResponse): Stream {
        return new Stream(
            new StreamId(row.id),
            new StreamName(row.name),
            new StreamCode(row.code),
            new ProjectId(row.project_id),
            new StreamType(row.type),
            new StreamStatus(row.status),
        );
    }
}
