import {
    Ctx,
    Arg,
    Resolver,
    Mutation,
} from 'type-graphql';
import { saveStreamSettings } from '@src/application/stream-settings-save-actions';
import { PermissionType, ScopeType } from '../types/permission-types';
import { StreamSettings } from '../type-defs/schemas/stream-settings';
import { StreamSettingsInput } from '../type-defs/inputs/stream-settings-input';
import { Context } from '../types/context';
import { checkPermissions } from '../middlewares/permissions';

@Resolver(() => StreamSettings)
export class StreamSettingsResolver {
    @Mutation(() => StreamSettings)
    async saveStreamSettings(
        @Arg('input') input: StreamSettingsInput, @Ctx() ctx: Context,
    ): Promise<StreamSettings> {
        checkPermissions(ctx.token, ScopeType.Stream, [PermissionType.Modify]);
        const {
            id,
            address,
            owned,
            otherBrandReply,
            translate,
            debug,
            data,
            ignoreMentions,
            ignoreInstagramMentions,
            ignoreInstagramTags,
            instagramAdsEnabled,
            facebookAdsEnabled,
        } = input;
        await saveStreamSettings(
            id,
            address,
            owned,
            otherBrandReply,
            translate,
            debug,
            data,
            ignoreMentions,
            ignoreInstagramTags,
            ignoreInstagramMentions,
            instagramAdsEnabled,
            facebookAdsEnabled,
            ctx.dataProvider.streamSettingsRepository(),
            ctx.dataProvider.mqPublisher(),
        );
        return input;
    }
}
