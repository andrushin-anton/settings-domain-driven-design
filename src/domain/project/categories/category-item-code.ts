import { StringValueObject } from '@src/domain/basic';

export class CategoryItemCode extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 15, 'category item code');
    }
}
