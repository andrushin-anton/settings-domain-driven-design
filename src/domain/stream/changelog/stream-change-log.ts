import { Entity } from '@src/domain/basic';
import { DateTimeValueObject } from '@src/domain/basic/value-object/datetime-value-object';
import { ChangeLogAuthor } from '@src/domain/stream/changelog/change-log-author';
import { StreamId } from '../stream-id';

export interface StreamChangeLogToJson {
    id: string,
    author: {
        id: string,
        name: string,
    },
    value: string,
    createdAt: string,
}

export class StreamChangeLog extends Entity {
    private author: ChangeLogAuthor;

    private value: string;

    private createdAt: DateTimeValueObject;

    public constructor(
        streamId: StreamId,
        author: ChangeLogAuthor,
        value: string,
        createdAt: DateTimeValueObject,
    ) {
        super(streamId);
        this.author = author;
        this.value = value;
        this.createdAt = createdAt;
    }

    public getAuthor(): ChangeLogAuthor {
        return this.author;
    }

    public getValue(): string {
        return this.value;
    }

    public getCreatedAt(): DateTimeValueObject {
        return this.createdAt;
    }

    serialize(object: StreamChangeLogToJson): StreamChangeLogToJson {
        const retObject = object;
        retObject.author = {
            id: this.author.getAuthorId().getValue(),
            name: this.author.getAuthorName().getValue(),
        };
        retObject.value = this.value;
        retObject.createdAt = this.createdAt.toString();
        return retObject;
    }
}
