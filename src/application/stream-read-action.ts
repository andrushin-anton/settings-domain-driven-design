import { ProjectId } from '@src/domain/project';
import { StreamToJson } from '@src/domain/stream/stream';
import { StreamId } from '@src/domain/stream/stream-id';
import { StreamRepository } from '@src/domain/stream/stream-repository';

export async function readStream(
    streamId: string,
    streamRepository: StreamRepository,
): Promise<StreamToJson> {
    const result = await streamRepository.readStreamById(new StreamId(streamId));
    const deserialedResult = result.jsonSerialize() as StreamToJson;
    return deserialedResult;
}

export async function readStreamsByIds(
    streamIdsAsString: Array<string>,
    streamRepository: StreamRepository,
): Promise<StreamToJson[]> {
    const streamIds: Array<StreamId> = streamIdsAsString.map(
        (stream) => new StreamId(stream),
    );
    const results = await streamRepository.readStreamsByIds(streamIds);
    const deserialedResults = results.map(
        (el) => el.jsonSerialize() as StreamToJson,
    );
    return deserialedResults;
}

export async function readStreams(
    projectId: string,
    limit: number,
    offset: number,
    streamRepository: StreamRepository,
): Promise<StreamToJson[]> {
    const results = await streamRepository.readStreamsByProjectId(
        new ProjectId(projectId),
        limit,
        offset,
    );
    const deserialedResults = results.map(
        (el) => el.jsonSerialize() as StreamToJson,
    );
    return deserialedResults;
}
