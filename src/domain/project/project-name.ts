import { StringValueObject } from '../basic';

export class ProjectName extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 50, 'project name');
    }
}
