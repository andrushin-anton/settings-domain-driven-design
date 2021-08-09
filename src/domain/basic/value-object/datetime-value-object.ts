import { BadRequestError } from '@src/common';
import { ValueObject } from '@src/domain/basic';

export class DateTimeValueObject implements ValueObject {
    private value?: Date;

    public constructor(value?: string) {
        if (value !== undefined) {
            try {
                this.value = new Date(value);
            } catch (e) {
                throw new BadRequestError('Invalid date provided');
            }
        }
    }

    public getValue(): Date | undefined {
        return this.value;
    }

    public toString(): string {
        const date = this.getValue();
        if (date) {
            return date.toDateString();
        }
        return 'null';
    }
}
