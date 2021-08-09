import { DataProviderInterface } from '@src/common/data-provider-interface';
import { PublisherRepository } from '@src/domain/event/publisher-repository';
import { ProjectRepository, ProjectCategoriesRepository } from '@src/domain/project';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamRepository } from '@src/domain/stream/stream-repository';
import { InMemoryPublisher } from '@src/infrastructure/event/in-memory-publisher';
import { InMemoryProjectCategoryRepository } from '@src/infrastructure/project/in-memory-project-category-repository';
import { InMemoryProjectChangeLogRepository } from '@src/infrastructure/project/in-memory-project-change-log-repository';
import { InMemoryProjectRepository } from '@src/infrastructure/project/in-memory-project-repository';
import { InMemoryProjectSettingsRepository } from '@src/infrastructure/project/in-memory-project-settings-repository';
import { InMemoryStreamChangeLogRepository } from '@src/infrastructure/stream/in-memory-stream-change-log-repository';
import { InMemoryStreamRepository } from '@src/infrastructure/stream/in-memory-stream-repository';
import { InMemoryStreamSettingsRepository } from '@src/infrastructure/stream/in-memory-stream-settings-repository';

export class DataProviderMock implements DataProviderInterface {
    readonly publisherRepositoryIns: PublisherRepository = new InMemoryPublisher();

    readonly streamRepositoryIns: StreamRepository = new InMemoryStreamRepository();

    readonly streamChangeLogRepositoryIns: StreamChangeLogRepository = new InMemoryStreamChangeLogRepository();

    readonly streamSettingsRepositoryIns: StreamSettingsRepository = new InMemoryStreamSettingsRepository();

    readonly publisherRepository: PublisherRepository = new InMemoryPublisher();

    readonly projectRepositoryIns: ProjectRepository = new InMemoryProjectRepository();

    readonly projectSettingsRepositoryIns: ProjectSettingsRepository = new InMemoryProjectSettingsRepository();

    readonly projectChangeLogRepositoryIns: ProjectChangeLogRepository = new InMemoryProjectChangeLogRepository();

    readonly projectCategoryRepositoryIns: ProjectCategoriesRepository = new InMemoryProjectCategoryRepository();

    mqPublisher(): PublisherRepository {
        return this.publisherRepositoryIns;
    }

    streamRepository(): StreamRepository {
        return this.streamRepositoryIns;
    }

    streamSettingsRepository(): StreamSettingsRepository {
        return this.streamSettingsRepositoryIns;
    }

    streamChangeLogRepository(): StreamChangeLogRepository {
        return this.streamChangeLogRepositoryIns;
    }

    projectRepository(): ProjectRepository {
        return this.projectRepositoryIns;
    }

    projectSettingsRepository(): ProjectSettingsRepository {
        return this.projectSettingsRepositoryIns;
    }

    projectChangeLogRepository(): ProjectChangeLogRepository {
        return this.projectChangeLogRepositoryIns;
    }

    projectCategoryRepository(): ProjectCategoriesRepository {
        return this.projectCategoryRepositoryIns;
    }
}
