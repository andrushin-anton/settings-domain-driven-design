import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { PublisherRepository } from '@src/domain/event/publisher-repository';
import { ProjectId } from '@src/domain/project';
import { AuthorId } from '@src/domain/stream/changelog/author-id';
import { AuthorName } from '@src/domain/stream/changelog/author-name';
import { ChangeLogAuthor } from '@src/domain/stream/changelog/change-log-author';
import { StreamChangeLog } from '@src/domain/stream/changelog/stream-change-log';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { Stream, StreamEventMessage, StreamToJson } from '@src/domain/stream/stream';
import { StreamCode } from '@src/domain/stream/stream-code';
import { StreamId } from '@src/domain/stream/stream-id';
import { StreamName } from '@src/domain/stream/stream-name';
import { StreamRepository } from '@src/domain/stream/stream-repository';
import { StreamStatus } from '@src/domain/stream/stream-status';
import { StreamType } from '@src/domain/stream/stream-type';
import { saveStreamLogs } from './stream-change-log-save-action';

export async function createStream(
    streamRepository: StreamRepository,
    name: string,
    code: string,
    projectId: string,
    type: string,
    status: string,
    pub: PublisherRepository,
    streamChangeLogRepository: StreamChangeLogRepository,
    authorId: string,
    authorName: string,
): Promise<StreamToJson> {
    const stream = new Stream(
        new StreamId(),
        new StreamName(name),
        new StreamCode(code),
        new ProjectId(projectId),
        new StreamType(type),
        new StreamStatus(status),
    );
    // save to the db
    await streamRepository.saveStream(stream);
    const serialised = stream.jsonSerialize() as StreamToJson;

    // publish a new event
    const event: StreamEventMessage = {
        message: serialised,
    };
    pub.publish('user.stream.created', event);

    // save record to the stream changelog
    await saveStreamLogs(
        new StreamChangeLog(
            stream.getId(),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            JSON.stringify(serialised),
            new DateTimeValueObject(
                new Date().toDateString(),
            ),
        ),
        streamChangeLogRepository,
    );
    return serialised;
}

export async function updateStream(
    streamRepository: StreamRepository,
    streamId: string,
    name: string,
    code: string,
    projectId: string,
    type: string,
    status: string,
    pub: PublisherRepository,
    streamChangeLogRepository: StreamChangeLogRepository,
    authorId: string,
    authorName: string,
): Promise<StreamToJson> {
    const stream = new Stream(
        new StreamId(streamId),
        new StreamName(name),
        new StreamCode(code),
        new ProjectId(projectId),
        new StreamType(type),
        new StreamStatus(status),
    );
    // save to the db
    await streamRepository.saveStream(stream);
    const serialised = stream.jsonSerialize() as StreamToJson;

    // publish an event with udpates
    const event: StreamEventMessage = {
        message: serialised,
    };
    pub.publish('user.stream.modified', event);

    // save updates to the stream changelog
    await saveStreamLogs(
        new StreamChangeLog(
            stream.getId(),
            new ChangeLogAuthor(
                new AuthorId(authorId),
                new AuthorName(authorName),
            ),
            JSON.stringify(serialised),
            new DateTimeValueObject(
                new Date().toDateString(),
            ),
        ),
        streamChangeLogRepository,
    );
    return serialised;
}
