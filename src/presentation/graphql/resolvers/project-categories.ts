import {
    Ctx,
    Arg,
    Resolver,
    Mutation,
} from 'type-graphql';
import { readProjectCategories } from '@src/application/project-categories-read-action';
import { saveProjectCategories } from '@src/application/project-categories-save-action';
import {
    Category,
    CategoryCode,
    CategoryDescription,
    CategoryDisplayType,
    CategoryId,
    CategoryItem,
    CategoryItemCode,
    CategoryItemDescription,
    CategoryToJson,
    CategoryType,
    CategoryWidth,
    ProjectId,
} from '@src/domain/project';
import { Context } from '../types/context';
import { ProjectCategory } from '../type-defs/schemas/project-category';
import { ProjectCategoryInput } from '../type-defs/inputs/project-category-input';
import { checkPermissions } from '../middlewares/permissions';
import { PermissionType, ScopeType } from '../types/permission-types';

@Resolver(() => ProjectCategory)
export class ProjectCategoryResolver {
    @Mutation(() => [ProjectCategory])
    async saveProjectCategories(
        @Arg('projectId') projectId: string,
            @Arg('categories', () => [ProjectCategoryInput]) categories: ProjectCategoryInput[],
            @Ctx() ctx: Context,
    ): Promise<CategoryToJson[]> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.Modify]);
        const projectCategories: Category[] = [];
        categories.forEach(
            (el) => {
                const {
                    id,
                    code,
                    description,
                    type,
                    width,
                    color,
                    displayType,
                    deleteFlag,
                    brandFlag,
                    exclusiveFlag,
                    regectionFlag,
                    escalateFlag,
                    approveFlag,
                    items,
                } = el;
                const categoryId = new CategoryId(id);
                const category = new Category(
                    new ProjectId(projectId),
                    categoryId,
                    new CategoryCode(code),
                    new CategoryDescription(description),
                    color,
                    new CategoryType(type),
                    new CategoryWidth(width),
                    new CategoryDisplayType(displayType),
                    deleteFlag,
                    brandFlag,
                    exclusiveFlag,
                    regectionFlag,
                    escalateFlag,
                    approveFlag,
                    [],
                );
                items.forEach(
                    (item) => {
                        const categoryItem = new CategoryItem(
                            categoryId,
                            new CategoryItemCode(item.code),
                            new CategoryItemDescription(item.description),
                            item.sortOrder,
                        );
                        category.addItem(categoryItem);
                    },
                );
                projectCategories.push(category);
            },
        );

        await saveProjectCategories(
            projectId,
            projectCategories,
            ctx.dataProvider.projectCategoryRepository(),
            ctx.dataProvider.mqPublisher(),
        );
        return readProjectCategories(
            projectId,
            ctx.dataProvider.projectCategoryRepository(),
        );
    }
}
