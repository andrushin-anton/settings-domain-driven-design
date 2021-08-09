import { BadArgumentError } from '@src/common';
import { StringValueObject } from '@src/domain/basic';

const TYPE = ['SINGLE', 'MULTIPLE'];

export class CategoryType extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'category type');
        this.check(value);
    }

    private check(value: string): void {
        if (!TYPE.includes(value)) {
            throw new BadArgumentError(`category type must be one of these values: ${TYPE.toString()}`);
        }
    }
}
