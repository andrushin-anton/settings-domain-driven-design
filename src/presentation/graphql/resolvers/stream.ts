import { readStreamChangeLog } from '@src/application/stream-change-log-read-action';
import { readStreams, readStreamsByIds } from '@src/application/stream-read-action';
import { createStream, updateStream } from '@src/application/stream-save-actions';
import { readStreamSettings } from '@src/application/stream-settings-read-actions';
import { StreamSettingsToJson } from '@src/domain/stream/settings/stream-settings';
import { StreamToJson } from '@src/domain/stream/stream';
import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { checkPermissions } from '../middlewares/permissions';
import { CreateStreamInput } from '../type-defs/inputs/create-stream';
import { ListStreamsInput } from '../type-defs/inputs/list-streams';
import { UpdateStreamInput } from '../type-defs/inputs/update-stream';
import { Stream } from '../type-defs/schemas/stream';
import { StreamChangeLog } from '../type-defs/schemas/stream-change-log';
import { Context } from '../types/context';
import { PermissionType, ScopeType } from '../types/permission-types';

@Resolver(() => Stream)
export class StreamResolver {
    @Query(() => [Stream])
    async streams(
        @Arg('input', { nullable: true }) input: ListStreamsInput, @Ctx() ctx: Context,
    ): Promise<StreamToJson[]> {
        checkPermissions(ctx.token, ScopeType.Stream, [PermissionType.View]);
        const {
            limit = 15,
            offset = 0,
            ids = [],
            projectId = '',
        } = input || {};
        const streams = ids.length
            ? await readStreamsByIds(ids, ctx.dataProvider.streamRepository())
            : await readStreams(projectId, limit, offset, ctx.dataProvider.streamRepository());

        return streams;
    }

    @FieldResolver()
    async settings(@Root() stream: Stream, @Ctx() ctx: Context): Promise<StreamSettingsToJson> {
        return readStreamSettings(
            stream.id,
            ctx.dataProvider.streamSettingsRepository(),
        );
    }

    @FieldResolver()
    async changeLog(@Root() stream: Stream, @Ctx() ctx: Context): Promise<StreamChangeLog[]> {
        return readStreamChangeLog(
            stream.id,
            ctx.dataProvider.streamChangeLogRepository(),
        );
    }

    @Mutation(() => Stream)
    async createStream(
        @Arg('input') input: CreateStreamInput, @Ctx() ctx: Context,
    ): Promise<StreamToJson> {
        checkPermissions(ctx.token, ScopeType.Stream, [PermissionType.Create]);
        const {
            name,
            status,
            type,
            projectId,
            code,
        } = input;

        const stream = await createStream(
            ctx.dataProvider.streamRepository(),
            name,
            code,
            projectId,
            type,
            status,
            ctx.dataProvider.mqPublisher(),
            ctx.dataProvider.streamChangeLogRepository(),
            ctx.token.id,
            ctx.token.name || 'Anon', // TODO: user name should be used
        );
        return stream;
    }

    @Mutation(() => Stream)
    async updateStream(
        @Arg('input') input: UpdateStreamInput, @Ctx() ctx: Context,
    ): Promise<StreamToJson> {
        checkPermissions(ctx.token, ScopeType.Stream, [PermissionType.Modify]);
        const {
            id,
            name,
            status,
            type,
            projectId,
            code,
        } = input;

        const project = await updateStream(
            ctx.dataProvider.streamRepository(),
            id,
            name,
            code,
            projectId,
            type,
            status,
            ctx.dataProvider.mqPublisher(),
            ctx.dataProvider.streamChangeLogRepository(),
            ctx.token.id,
            ctx.token.name || 'Anon', // TODO: user name should be used
        );
        return project;
    }
}
