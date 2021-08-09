import { StreamId } from '../stream-id';
import { StreamChangeLog } from './stream-change-log';

export interface StreamChangeLogRepository {
    readStreamChangeLog(
        streamId: StreamId
    ): Promise<StreamChangeLog[]> | StreamChangeLog[];

    saveChangeLog(streamChangeLog: StreamChangeLog): Promise<void> | void;
}
