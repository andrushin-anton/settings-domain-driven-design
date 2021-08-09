import { StringValueObject } from '@src/domain/basic';

export class AuthorName extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 50, 'user name');
    }
}
