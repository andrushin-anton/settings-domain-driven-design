import { db } from '@src/common/mysql';
import {
    Category,
    CategoryCode,
    CategoryDescription,
    CategoryDisplayType,
    CategoryId,
    CategoryItem,
    CategoryItemCode,
    CategoryItemDescription,
    CategoryType,
    CategoryWidth,
    ProjectCategoriesRepository,
    ProjectId,
} from '@src/domain/project';

interface ProjectCategoryDbResponse {
    id: string;
    project_id: string;
    code: string;
    description: string;
    color: string;
    type: string;
    width: string;
    display_type: string;
    delete_flag: boolean;
    brand_flag: boolean;
    exclusive_flag: boolean;
    rejection_flag: boolean;
    escalate_flag: boolean;
    approve_flag: boolean;
}

interface CategoryItemDbResponse {
    category_id: string;
    code: string;
    description: string;
    sort_order: number;
}

export class MysqlProjectCategoryRepository implements ProjectCategoriesRepository {
    async readCategories(projectId: ProjectId): Promise<Category[]> {
        // get all categories
        const rows = await db.getall<ProjectCategoryDbResponse>('SELECT * FROM category WHERE project_id = ?', [projectId.getValue()]);
        if (!rows.length) {
            return [];
        }
        let categoryIds = '';
        const params: string[] = [];
        rows.forEach((el) => {
            categoryIds += (categoryIds === '') ? '?' : ',?';
            params.push(el.id);
        });
        // get category items for the selected categories
        const categoryItems = await db.getall<CategoryItemDbResponse>(`SELECT * FROM category_item WHERE category_id IN(${categoryIds}) ORDER BY sort_order ASC`, params);

        const result = rows.map((el) => (
            new Category(
                new ProjectId(el.project_id),
                new CategoryId(el.id),
                new CategoryCode(el.code),
                new CategoryDescription(el.description),
                el.color,
                new CategoryType(el.type),
                new CategoryWidth(el.width),
                new CategoryDisplayType(el.display_type),
                el.delete_flag,
                el.brand_flag,
                el.exclusive_flag,
                el.rejection_flag,
                el.escalate_flag,
                el.approve_flag,
                this.filterCategoryItems(new CategoryId(el.id), categoryItems),
            )));
        return result;
    }

    private filterCategoryItems(
        categoryId: CategoryId,
        items: CategoryItemDbResponse[],
    ): CategoryItem[] {
        const result: CategoryItem[] = [];
        items.forEach((el) => {
            const currentCategoryId = new CategoryId(el.category_id);
            if (currentCategoryId.equals(categoryId)) {
                result.push(
                    new CategoryItem(
                        categoryId,
                        new CategoryItemCode(el.code),
                        new CategoryItemDescription(el.description),
                        el.sort_order,
                    ),
                );
            }
        });
        return result;
    }

    async saveCategories(projectId: ProjectId, projectCategories: Category[]): Promise<void> {
        await db.transaction(async (transaction) => {
            const { paramNames, params, items } = this.prepareCategoryValues(
                projectCategories,
            );

            // add project id to the beginning of params
            params.unshift(projectId.getValue());

            // delete all categories and their items which are no longer in projectCategories
            // category_items should be automatically deleted by mysql
            await transaction.execute(`DELETE FROM category WHERE project_id = ? AND id NOT IN(${paramNames})`, params);

            // insert on duplicate key update for category
            const query = `
                INSERT INTO category 
                    (id,project_id,code,description,color,type,width,display_type,delete_flag,brand_flag,exclusive_flag,rejection_flag,escalate_flag,approve_flag)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                ON DUPLICATE KEY UPDATE 
                    project_id = VALUES(project_id),
                    code = VALUES(code),
                    description = VALUES(description),
                    color = VALUES(color),
                    type = VALUES(type),
                    width = VALUES(width),
                    display_type = VALUES(display_type),
                    delete_flag = VALUES(delete_flag),
                    brand_flag = VALUES(brand_flag),
                    exclusive_flag = VALUES(exclusive_flag),
                    rejection_flag = VALUES(rejection_flag),
                    escalate_flag = VALUES(escalate_flag),
                    approve_flag = VALUES(approve_flag)
            `;
            /* eslint-disable-next-line */
            for await (const values of projectCategories.map((el) => ([
                el.getId().getValue(),
                el.getProjectId().getValue(),
                el.getCode().getValue(),
                el.getDescription().getValue(),
                el.getColor(),
                el.getType().getValue(),
                el.getWidth().getValue(),
                el.getDisplayType().getValue(),
                el.getDeleteFlag(),
                el.getBrandFlag(),
                el.getExclusiveFlag(),
                el.getRejectionFlag(),
                el.getEscalateFlag(),
                el.getApproveFlag(),
            ]))) {
                transaction.execute(query, values);
            }

            // remove each category's items
            const itemRemoveQuery = `
                DELETE FROM category_item WHERE category_id = ?
            `;
            /* eslint-disable-next-line */
            for await (const values of projectCategories.map((el) => ([
                el.getId().getValue(),
            ]))) {
                transaction.execute(itemRemoveQuery, values);
            }

            // insert new category_item s
            const itemQuery = `
                INSERT INTO category_item 
                    (category_id,code,description,sort_order)
                VALUES(?,?,?,?)
            `;
            /* eslint-disable-next-line */
            for await (const values of items.map((el) => ([
                el.getId().getValue(),
                el.getCode().getValue(),
                el.getDescription().getValue(),
                el.getSortOrder(),
            ]))) {
                transaction.execute(itemQuery, values);
            }
        }, { retries: 1 });
    }

    private prepareCategoryValues(
        projectCategories: Category[],
    ): { paramNames: string; params: string[]; items: CategoryItem[] } {
        // remove all categories if projectCategories is empty
        if (!projectCategories.length) {
            const paramNames = '?';
            const params: string[] = [
                'NaN',
            ];
            return { paramNames, params, items: [] };
        }
        // otherwise....
        let paramNames = '';
        const items: CategoryItem[] = [];
        const params: string[] = [];
        projectCategories.forEach((el) => {
            paramNames += (paramNames === '') ? '?' : ', ?';
            params.push(el.getId().getValue());
            el.getItems().forEach((item) => {
                items.push(item);
            });
        });
        return { paramNames, params, items };
    }
}
