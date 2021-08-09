// Add resolver exports here
import { ProjectResolver } from './project';
import { ProjectCategoryResolver } from './project-categories';
import { ProjectChangeLogResolver } from './project-change-log';
import { ProjectSettingsResolver } from './project-settings';
import { StreamResolver } from './stream';
import { StreamChangeLogResolver } from './stream-change-log';
import { StreamSettingsResolver } from './stream-settings';

export const resolvers = [
    ProjectResolver,
    ProjectChangeLogResolver,
    ProjectSettingsResolver,
    ProjectCategoryResolver,
    StreamResolver,
    StreamChangeLogResolver,
    StreamSettingsResolver,
] as const;
