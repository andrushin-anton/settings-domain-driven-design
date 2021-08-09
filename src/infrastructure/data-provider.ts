import { DataProviderInterface } from '@src/common/data-provider-interface';
import { PublisherRepository } from '@src/domain/event/publisher-repository';
import { ProjectRepository, ProjectCategoriesRepository } from '@src/domain/project';
import { ProjectChangeLogRepository } from '@src/domain/project/changelog/project-change-log-repository';
import { ProjectSettingsRepository } from '@src/domain/project/settings/project-settings-repository';
import { StreamChangeLogRepository } from '@src/domain/stream/changelog/stream-change-log-repository';
import { StreamSettingsRepository } from '@src/domain/stream/settings/stream-settings-repository';
import { StreamRepository } from '@src/domain/stream/stream-repository';
import { InMemoryPublisher } from './event/in-memory-publisher';
import { MysqlProjectCategoryRepository } from './project/mysql-project-category-repository';
import { MysqlProjectChangeLogRepository } from './project/mysql-project-change-log-repository';
import { MysqlProjectRepository } from './project/mysql-project-repository';
import { MysqlProjectSettingsRepository } from './project/mysql-project-settings-repository';
import { MysqlStreamChangeLogRepository } from './stream/mysql-stream-change-log-repository';
import { MysqlStreamRepository } from './stream/mysql-stream-repository';
import { MysqlStreamSettingsRepository } from './stream/mysql-stream-settings-repository';

export class DataProvider implements DataProviderInterface {
    readonly publisherRepositoryIns: PublisherRepository = new
    InMemoryPublisher();

    readonly streamRepositoryIns: StreamRepository = new
    MysqlStreamRepository();

    readonly streamChangeLogRepositoryIns: StreamChangeLogRepository = new
    MysqlStreamChangeLogRepository();

    readonly streamSettingsRepositoryIns: StreamSettingsRepository = new
    MysqlStreamSettingsRepository();

    readonly projectRepositoryIns: ProjectRepository = new
    MysqlProjectRepository();

    readonly projectSettingsRepositoryIns: ProjectSettingsRepository = new
    MysqlProjectSettingsRepository();

    readonly projectChangeLogRepositoryIns: ProjectChangeLogRepository = new
    MysqlProjectChangeLogRepository();

    readonly projectCategoryRepositoryIns: ProjectCategoriesRepository = new
    MysqlProjectCategoryRepository();

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
