import { PublisherRepository } from '@src/domain/event/publisher-repository';
import { ProjectCategoriesRepository, ProjectRepository } from '@src/domain/project';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamRepository } from '@src/domain/stream/stream-repository';

export interface DataProviderInterface {
    mqPublisher(): PublisherRepository;

    streamRepository(): StreamRepository;

    streamSettingsRepository(): StreamSettingsRepository;

    streamChangeLogRepository(): StreamChangeLogRepository;

    projectRepository(): ProjectRepository;

    projectSettingsRepository(): ProjectSettingsRepository;

    projectChangeLogRepository(): ProjectChangeLogRepository;

    projectCategoryRepository(): ProjectCategoriesRepository;
}
