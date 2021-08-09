import { NotFoundError } from '@src/common';
import { db } from '@src/common/mysql';
import { StreamSettings } from '@src/domain/stream/settings/stream-settings';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamId } from '@src/domain/stream/stream-id';

interface StreamSettingsDbResponse {
    id: string,
    address: string,
    owned: boolean,
    other_brand_reply: boolean,
    translate: boolean,
    debug: boolean,
    data: string,
    ignore_mentions: boolean,
    ignore_instagram_tags: boolean,
    ignore_instagram_mentions: boolean,
    instagram_ads_enabled: boolean,
    facebook_ads_enabled: boolean,
}

export class MysqlStreamSettingsRepository implements StreamSettingsRepository {
    async readStreamSettings(streamId: StreamId): Promise<StreamSettings> {
        const row = await db.getrow<StreamSettingsDbResponse>('SELECT * FROM stream_settings WHERE stream_id = ? LIMIT 1', [streamId.getValue()]);
        if (!row) {
            throw new NotFoundError();
        }
        return new StreamSettings(
            new StreamId(row.id),
            row.address,
            row.owned,
            row.other_brand_reply,
            row.translate,
            row.debug,
            row.data,
            row.ignore_mentions,
            row.ignore_instagram_tags,
            row.ignore_instagram_mentions,
            row.instagram_ads_enabled,
            row.facebook_ads_enabled,
        );
    }

    async saveStreamSettings(streamSettings: StreamSettings): Promise<void> {
        const query = `
            INSERT INTO stream_settings 
                (stream_id,address,owned,other_brand_reply,translate,debug,data,ignore_mentions,ignore_instagram_tags,ignore_instagram_mentions,instagram_ads_enabled,facebook_ads_enabled)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE 
                address = VALUES(address),
                owned = VALUES(owned),
                other_brand_reply = VALUES(other_brand_reply),
                translate = VALUES(translate),
                debug = VALUES(debug),
                data = VALUES(data),
                ignore_mentions = VALUES(ignore_mentions),
                ignore_instagram_tags = VALUES(ignore_instagram_tags),
                ignore_instagram_mentions = VALUES(ignore_instagram_mentions),
                instagram_ads_enabled = VALUES(instagram_ads_enabled),
                facebook_ads_enabled = VALUES(facebook_ads_enabled)
        `;
        const bindParams = [
            streamSettings.getId().getValue(),
            streamSettings.getAddress(),
            streamSettings.isOwned(),
            streamSettings.isOtherBrandReply(),
            streamSettings.isTransalte(),
            streamSettings.isDebug(),
            streamSettings.getData(),
            streamSettings.isIgnoreMentions(),
            streamSettings.isIgnoreInstagramTags(),
            streamSettings.isIgnoreInstagramMentions(),
            streamSettings.isInstagramAdsEnabled(),
            streamSettings.isFacebookAdsEnabled(),
        ];
        await db.execute(query, bindParams);
    }
}
