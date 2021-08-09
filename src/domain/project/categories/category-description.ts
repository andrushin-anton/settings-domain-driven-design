import { StringValueObject } from '@src/domain/basic';

export class CategoryDescription extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 256, 'category description');
    }
}
