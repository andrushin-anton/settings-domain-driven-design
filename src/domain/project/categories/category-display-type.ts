import { BadArgumentError } from '@src/common';
import { StringValueObject } from '@src/domain/basic';

const TYPE = ['BUTTON', 'LIST'];

export class CategoryDisplayType extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'category display type');
        this.check(value);
    }

    private check(value: string): void {
        if (!TYPE.includes(value)) {
            throw new BadArgumentError(`category display type must be one of these values: ${TYPE.toString()}`);
        }
    }
}
