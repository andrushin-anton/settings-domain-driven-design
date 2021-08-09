import { StringValueObject } from '../basic';

export class StreamName extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 150, 'stream name');
    }
}
