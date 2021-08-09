import { EntityId } from '@src/domain/basic';

export abstract class Entity {
    protected id: EntityId;

    public constructor(id: EntityId) {
        this.id = id;
    }

    public getId(): EntityId {
        return this.id;
    }

    public jsonSerialize(): unknown {
        return this.serialize({
            id: this.getId().getValue(),
        });
    }

    protected abstract serialize(object: unknown): unknown;
}
