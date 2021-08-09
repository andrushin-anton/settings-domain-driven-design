import { Entity } from '@src/domain/basic';
import {
    CategoryId,
    CategoryItemCode,
    CategoryItemDescription,
} from '@src/domain/project';

export interface CategoryItemToJson {
    id: string;
    code: string;
    description: string;
    sortOrder: number;
}

export class CategoryItem extends Entity {
    private code: CategoryItemCode;

    private description: CategoryItemDescription;

    private sortOrder: number;

    constructor(
        categoryId: CategoryId,
        code: CategoryItemCode,
        description: CategoryItemDescription,
        sortOrder = 0,
    ) {
        super(categoryId);
        this.code = code;
        this.description = description;
        this.sortOrder = sortOrder;
    }

    public getCode(): CategoryItemCode {
        return this.code;
    }

    public getDescription(): CategoryItemDescription {
        return this.description;
    }

    public getSortOrder(): number {
        return this.sortOrder;
    }

    serialize(object: CategoryItemToJson): CategoryItemToJson {
        const retObject = object;
        retObject.code = this.code.getValue();
        retObject.description = this.description.getValue();
        retObject.sortOrder = this.sortOrder;
        return retObject;
    }
}
