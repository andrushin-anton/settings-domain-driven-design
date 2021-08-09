import {
    readProjects,
    readProjectsByIds,
} from '@src/application/project-read-action';
import {
    Ctx,
    Arg,
    Query,
    Resolver,
    Mutation,
    FieldResolver,
    Root,
} from 'type-graphql';
import {
    CategoryToJson,
    ProjectMlSettingsToJson,
    ProjectSettingsToJson,
    ProjectToJson,
} from '@src/domain/project';
import { readProjectCategories } from '@src/application/project-categories-read-action';
import { readProjectMlSettings, readProjectSettings } from '@src/application/project-settings-read-actions';
import { readProjectChangeLog } from '@src/application/project-change-log-read-action';
import { createProject, updateProject } from '@src/application/project-save-actions';
import { CreateProjectInput } from '../type-defs/inputs/create-project';
import { ListEntitiesInput } from '../type-defs/inputs/list-entities';
import { Project } from '../type-defs/schemas/project';
import { Context } from '../types/context';
import { UpdateProjectInput } from '../type-defs/inputs/update-project';
import { ProjectChangeLog } from '../type-defs/schemas/project-change-log';
import { checkPermissions } from '../middlewares/permissions';
import { PermissionType, ScopeType } from '../types/permission-types';

@Resolver(() => Project)
export class ProjectResolver {
    @Query(() => [Project])
    async projects(
        @Arg('input', { nullable: true }) input: ListEntitiesInput, @Ctx() ctx: Context,
    ): Promise<ProjectToJson[]> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.View]);
        const { limit = 15, offset = 0, ids = [] } = input || {};
        const projects = ids.length
            ? await readProjectsByIds(ids, ctx.dataProvider.projectRepository())
            : await readProjects(limit, offset, ctx.dataProvider.projectRepository());

        return projects;
    }

    @FieldResolver()
    async settings(@Root() project: Project, @Ctx() ctx: Context): Promise<ProjectSettingsToJson> {
        return readProjectSettings(
            project.id,
            ctx.dataProvider.projectSettingsRepository(),
        );
    }

    @FieldResolver()
    async mlSettings(
        @Root() project: Project, @Ctx() ctx: Context,
    ): Promise<ProjectMlSettingsToJson> {
        return readProjectMlSettings(
            project.id,
            ctx.dataProvider.projectSettingsRepository(),
        );
    }

    @FieldResolver()
    async categories(@Root() project: Project, @Ctx() ctx: Context): Promise<CategoryToJson[]> {
        return readProjectCategories(
            project.id,
            ctx.dataProvider.projectCategoryRepository(),
        );
    }

    @FieldResolver()
    async changeLog(@Root() project: Project, @Ctx() ctx: Context): Promise<ProjectChangeLog[]> {
        return readProjectChangeLog(
            project.id,
            ctx.dataProvider.projectChangeLogRepository(),
        );
    }

    @Mutation(() => Project)
    async createProject(
        @Arg('input') input: CreateProjectInput, @Ctx() ctx: Context,
    ): Promise<ProjectToJson> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.Create]);
        const {
            name,
            status,
            sla,
            salesforcePid,
        } = input;

        const project = await createProject(
            ctx.dataProvider.projectRepository(),
            name,
            salesforcePid,
            status,
            sla,
            ctx.dataProvider.mqPublisher(),
            ctx.dataProvider.projectChangeLogRepository(),
            ctx.token.id,
            ctx.token.name || 'Anon', // TODO: authorised user name should be used instead
        );
        return project;
    }

    @Mutation(() => Project)
    async updateProject(
        @Arg('input') input: UpdateProjectInput, @Ctx() ctx: Context,
    ): Promise<ProjectToJson> {
        checkPermissions(ctx.token, ScopeType.Project, [PermissionType.Modify]);
        const {
            id,
            name,
            status,
            sla,
            salesforcePid,
        } = input;

        const project = await updateProject(
            ctx.dataProvider.projectRepository(),
            id,
            name,
            salesforcePid,
            status,
            sla,
            ctx.dataProvider.mqPublisher(),
            ctx.dataProvider.projectChangeLogRepository(),
            ctx.token.id,
            ctx.token.name || 'Anon', // TODO: authorised user name should be used instead
        );
        return project;
    }
}
