import { BadArgumentError } from '@src/common';
import { StringValueObject } from '../basic';

const STATUSES = ['ACTIVE', 'PAUSED', 'DISABLED', 'DELETED'];

export class ProjectStatus extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'project status');
        this.check(value);
    }

    private check(value: string): void {
        if (!STATUSES.includes(value)) {
            throw new BadArgumentError(`project status must be one of these values: ${STATUSES.toString()}`);
        }
    }
}
