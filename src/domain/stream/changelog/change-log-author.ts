import { AuthorId } from './author-id';
import { AuthorName } from './author-name';

export class ChangeLogAuthor {
    private authorId: AuthorId;

    private authorName: AuthorName;

    constructor(authorId: AuthorId, authorName: AuthorName) {
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public getAuthorId(): AuthorId {
        return this.authorId;
    }

    public getAuthorName(): AuthorName {
        return this.authorName;
    }
}
