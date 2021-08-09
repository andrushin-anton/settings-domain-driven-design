import { NotFoundError } from '@src/common';
import { ProjectId } from '@src/domain/project';
import { Stream } from '@src/domain/stream/stream';
import { StreamCode } from '@src/domain/stream/stream-code';
import { StreamId } from '@src/domain/stream/stream-id';
import { StreamName } from '@src/domain/stream/stream-name';
import { StreamRepository } from '@src/domain/stream/stream-repository';
import { StreamStatus } from '@src/domain/stream/stream-status';
import { StreamType } from '@src/domain/stream/stream-type';

export class InMemoryStreamRepository implements StreamRepository {
    private streams: Array<Stream> = [
        new Stream(
            new StreamId('1234567_stream'),
            new StreamName('Very Cool!'),
            new StreamCode('1234567_cool'),
            new ProjectId('1234567'),
            new StreamType('FACEBOOK'),
            new StreamStatus('ACTIVE'),
        ),
        new Stream(
            new StreamId('7654321_stream'),
            new StreamName('Even Cooler!'),
            new StreamCode('7654321_cool'),
            new ProjectId('1234567'),
            new StreamType('INSTAGRAM'),
            new StreamStatus('DISABLED'),
        ),
        new Stream(
            new StreamId('88888888_stream'),
            new StreamName('The Best!'),
            new StreamCode('88888888_cool'),
            new ProjectId('1234567'),
            new StreamType('INSTAGRAM'),
            new StreamStatus('DISABLED'),
        ),
    ];

    readStreamById(streamId: StreamId): Stream {
        const foundStreamArr: Array<Stream> = this.streams.filter(
            (el) => el.getId().equals(streamId),
        );
        if (!foundStreamArr.length) {
            throw new NotFoundError();
        }
        return foundStreamArr[0];
    }

    readStreamsByIds(streamIds: StreamId[]): Stream[] {
        const foundStreams: Stream[] = [];
        streamIds.forEach((streamId) => {
            const foundStream = this.streams.filter(
                (el) => el.getId().equals(streamId),
            );
            if (foundStream.length) {
                foundStreams.push(foundStream[0]);
            }
        });
        return foundStreams;
    }

    readStreamsByProjectId(projectId: ProjectId, limit: number, offset: number): Stream[] {
        const streams = this.streams.filter(
            (el) => el.getProjectId().equals(projectId),
        );
        return streams.slice(offset, limit);
    }

    saveStream(stream: Stream): void {
        let foundStream = false;
        let index = 0;
        this.streams.forEach((object) => {
            if (stream.getId().equals(object.getId())) {
                foundStream = true;
                // need to update it
                this.streams[index] = stream;
                return;
            }
            index += 1;
        });
        if (!foundStream) {
            // need to save it
            this.streams.push(stream);
        }
    }
}
