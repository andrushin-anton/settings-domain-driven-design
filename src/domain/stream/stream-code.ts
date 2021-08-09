import { StringValueObject } from '../basic';

export class StreamCode extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 100, 'stream code');
    }
}
