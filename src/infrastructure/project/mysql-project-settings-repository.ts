import { NotFoundError } from '@src/common';
import { DatabaseError } from '@src/common/errors/database-error';
import { db } from '@src/common/mysql';
import {
    ClassificationAction,
    ProjectId,
    ProjectSettings,
} from '@src/domain/project';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';

interface ProjectSettingsDbResponse {
    project_id: string,
    rollup: boolean,
    asset: boolean,
    track_only: boolean,
    brnd_entries_only: boolean,
}

interface ClassificationActionDbResponse {
    project_id: string,
    type_code: string,
    active: boolean,
    value: string,
}

export class MysqlProjectSettingsRepository implements ProjectSettingsRepository {
    async readProjectSettings(projectId: ProjectId): Promise<ProjectSettings> {
        const row = await db.getrow<ProjectSettingsDbResponse>('SELECT * FROM project_settings WHERE project_id = ? LIMIT 1', [projectId.getValue()]);
        if (!row) {
            throw new NotFoundError();
        }
        return new ProjectSettings(
            new ProjectId(row.project_id),
            row.rollup,
            row.asset,
            row.track_only,
            row.brnd_entries_only,
        );
    }

    async readProjectClassificationActions(projectId: ProjectId): Promise<ClassificationAction[]> {
        const row = await db.getall<ClassificationActionDbResponse>('SELECT * FROM classification_action WHERE project_id = ?', [projectId.getValue()]);
        const result: ClassificationAction[] = [];
        row.forEach((el) => {
            const classificationAction = new ClassificationAction(
                projectId,
                el.type_code,
                el.active,
                el.value,
            );
            result.push(classificationAction);
        });
        return result;
    }

    async saveProjectSettings(projectSettings: ProjectSettings): Promise<void> {
        const query = `
            INSERT INTO project_settings 
                (project_id,rollup,asset,track_only,brnd_entries_only)
            VALUES(?,?,?,?,?)
            ON DUPLICATE KEY UPDATE 
                rollup = VALUES(rollup),
                asset = VALUES(asset),
                track_only = VALUES(track_only),
                brnd_entries_only = VALUES(brnd_entries_only)
        `;
        const bindParams = [
            projectSettings.getId().getValue(),
            projectSettings.isRollup(),
            projectSettings.isAsset(),
            projectSettings.isTrackOnly(),
            projectSettings.isBrndEntriesOnly(),
        ];
        await db.execute(query, bindParams);
    }

    async saveProjectMlSettings(
        projectId: ProjectId,
        actions: ClassificationAction[],
    ): Promise<void> {
        const success = await db.execute('DELETE FROM classification_action WHERE project_id = ?', [projectId.getValue()]);
        if (!success) {
            throw new DatabaseError('There was an error with the database(table: classification_action), please try again later');
        }
        const query = `
            INSERT INTO classification_action 
                (project_id,type_code,active,value)
            VALUES(?,?,?,?)
        `;
        /* eslint-disable-next-line */
        for await (const values of actions.map((el) => ([
            el.getId().getValue(),
            el.getTypeCode(),
            el.isActive(),
            el.getValue(),
        ]))) {
            db.execute(query, values);
        }
    }
}
