import { StreamChangeLogToJson } from '@src/domain/stream/changelog/stream-change-log';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamId } from '@src/domain/stream/stream-id';

export async function readStreamChangeLog(
    stream: string,
    streamChangeLogRepository: StreamChangeLogRepository,
): Promise<StreamChangeLogToJson[]> {
    const results = await streamChangeLogRepository.readStreamChangeLog(new StreamId(stream));
    const desirialisedResults = results.map(
        (el) => el.jsonSerialize() as StreamChangeLogToJson,
    );
    return desirialisedResults;
}
