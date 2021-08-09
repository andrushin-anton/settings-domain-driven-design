import { StringValueObject } from '../basic';

export class SalesForcePid extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 50, 'salesforce PID', new RegExp('^PID[0-9]{4,5}$'));
    }
}
