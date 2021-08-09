import { StreamChangeLog } from '@src/domain/stream/changelog/stream-change-log';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';

export async function saveStreamLogs(
    streamChangeLog: StreamChangeLog,
    streamChageLogRepository: StreamChangeLogRepository,
): Promise<void> {
    return streamChageLogRepository.saveChangeLog(streamChangeLog);
}
