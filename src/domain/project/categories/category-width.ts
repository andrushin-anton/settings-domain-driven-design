import { BadArgumentError } from '@src/common';
import { StringValueObject } from '@src/domain/basic';

const WIDTH = ['MEDIUM', 'WIDE'];

export class CategoryWidth extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'category width');
        this.check(value);
    }

    private check(value: string): void {
        if (!WIDTH.includes(value)) {
            throw new BadArgumentError(`category width must be one of these values: ${WIDTH.toString()}`);
        }
    }
}
