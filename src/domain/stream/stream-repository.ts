import { ProjectId } from '@src/domain/project';
import { Stream } from '@src/domain/stream/stream';
import { StreamId } from './stream-id';

export interface StreamRepository {
    readStreamById(streamId: StreamId): Promise<Stream> | Stream;
    readStreamsByIds(streamIds: StreamId[]): Promise<Stream[]> | Stream[];
    readStreamsByProjectId(
        projectId: ProjectId,
        limit: number,
        offset: number
    ): Promise<Stream[]> | Stream[];

    saveStream(stream: Stream): Promise<void> | void;
}
