import { StringValueObject } from '@src/domain/basic';

export class CategoryItemDescription extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 256, 'category description');
    }
}
