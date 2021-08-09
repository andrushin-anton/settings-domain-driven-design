import { BadArgumentError } from '@src/common';
import { StringValueObject } from '../basic';

const STATUSES = ['ACTIVE', 'PAUSED', 'SYS_PAUSED', 'DISABLED', 'DELETED'];

export class StreamStatus extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'stream status');
        this.check(value);
    }

    private check(value: string): void {
        if (!STATUSES.includes(value)) {
            throw new BadArgumentError(`stream status must be one of these values: ${STATUSES.toString()}`);
        }
    }
}
