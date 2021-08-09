import { BadArgumentError } from '@src/common';
import { StringValueObject } from '../basic';

const SLA = ['REALTIME', '15 MINUTES', '30 MINUTES', 'HOUR', '2 HOURS', '4 HOURS', '8 HOURS', '12 HOURS'];

export class ProjectSla extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'project sla');
        this.check(value);
    }

    private check(value: string): void {
        if (!SLA.includes(value)) {
            throw new BadArgumentError(`project sla must be one of these values: ${SLA.toString()}`);
        }
    }
}
