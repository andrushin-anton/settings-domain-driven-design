import { ValueObject } from '@src/domain/basic';
import { v4 as uuidv4 } from 'uuid';

export abstract class EntityId implements ValueObject {
    private value: string;

    public constructor(value?: string) {
        this.value = value !== undefined ? value : uuidv4();
    }

    public getValue(): string {
        return this.value;
    }

    public equals(id: EntityId): boolean {
        return this.value === id.getValue();
    }
}
