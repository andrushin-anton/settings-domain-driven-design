import { Entity } from '@src/domain/basic';
import {
    ProjectId,
    CategoryCode,
    CategoryDescription,
    CategoryDisplayType,
    CategoryId,
    CategoryItem,
    CategoryType,
    CategoryWidth,
} from '@src/domain/project';
import { CategoryItemToJson } from './category-item';

export interface CategoryToJson {
    id: string;
    projectId: string;
    code: string;
    description: string;
    color: string;
    type: string;
    width: string;
    displayType: string;
    deleteFlag: boolean;
    brandFlag: boolean;
    exclusiveFlag: boolean;
    rejectionFlag: boolean;
    escalateFlag: boolean;
    approveFlag: boolean;
    items: Array<CategoryItemToJson>;
}

export interface CategoriesEventMessage {
    message: CategoryToJson[],
}

export class Category extends Entity {
    private projectId: ProjectId;

    private code: CategoryCode;

    private description: CategoryDescription;

    private color: string;

    private type: CategoryType;

    private width: CategoryWidth;

    private displayType: CategoryDisplayType;

    private deleteFlag: boolean;

    private brandFlag: boolean;

    private exclusiveFlag: boolean;

    private rejectionFlag: boolean;

    private escalateFlag: boolean;

    private approveFlag: boolean;

    private items: Array<CategoryItem>;

    constructor(
        projectId: ProjectId,
        id: CategoryId,
        code: CategoryCode,
        description: CategoryDescription,
        color: string,
        type: CategoryType,
        width: CategoryWidth,
        displayType: CategoryDisplayType,
        deleteFlag: boolean,
        brandFlag: boolean,
        exclusiveFlag: boolean,
        rejectionFlag: boolean,
        escalateFlag: boolean,
        approveFlag: boolean,
        items: Array<CategoryItem>,
    ) {
        super(id);
        this.projectId = projectId;
        this.code = code;
        this.description = description;
        this.color = color;
        this.type = type;
        this.width = width;
        this.displayType = displayType;
        this.deleteFlag = deleteFlag;
        this.brandFlag = brandFlag;
        this.exclusiveFlag = exclusiveFlag;
        this.rejectionFlag = rejectionFlag;
        this.escalateFlag = escalateFlag;
        this.approveFlag = approveFlag;
        this.items = items;
    }

    public getProjectId(): ProjectId {
        return this.projectId;
    }

    public getCode(): CategoryCode {
        return this.code;
    }

    public getDescription(): CategoryDescription {
        return this.description;
    }

    public getColor(): string {
        return this.color;
    }

    public getType(): CategoryType {
        return this.type;
    }

    public getWidth(): CategoryWidth {
        return this.width;
    }

    public getDisplayType(): CategoryDisplayType {
        return this.displayType;
    }

    public getDeleteFlag(): boolean {
        return this.deleteFlag;
    }

    public getBrandFlag(): boolean {
        return this.brandFlag;
    }

    public getExclusiveFlag(): boolean {
        return this.exclusiveFlag;
    }

    public getRejectionFlag(): boolean {
        return this.rejectionFlag;
    }

    public getEscalateFlag(): boolean {
        return this.escalateFlag;
    }

    public getApproveFlag(): boolean {
        return this.approveFlag;
    }

    public getItems(): Array<CategoryItem> {
        return this.items;
    }

    public addItem(item: CategoryItem): void {
        const alreadyExists = this.items.some(
            (el) => el.getCode().getValue() === item.getCode().getValue(),
        );
        if (!alreadyExists) {
            this.items.push(item);
        }
    }

    public removeItem(item: CategoryItem): void {
        this.items = this.items.filter(
            (el) => el.getCode().getValue() !== item.getCode().getValue(),
        );
    }

    serialize(object: CategoryToJson): CategoryToJson {
        const retObject = object;
        retObject.projectId = this.projectId.getValue();
        retObject.code = this.code.getValue();
        retObject.description = this.description.getValue();
        retObject.color = this.color;
        retObject.type = this.type.getValue();
        retObject.width = this.width.getValue();
        retObject.displayType = this.displayType.getValue();
        retObject.deleteFlag = this.deleteFlag;
        retObject.brandFlag = this.brandFlag;
        retObject.exclusiveFlag = this.exclusiveFlag;
        retObject.rejectionFlag = this.rejectionFlag;
        retObject.escalateFlag = this.escalateFlag;
        retObject.approveFlag = this.approveFlag;
        retObject.items = this.items.map(
            (el) => el.jsonSerialize() as CategoryItemToJson,
        );
        return retObject;
    }
}
