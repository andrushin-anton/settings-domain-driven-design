import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class DatabaseError extends CustomError {
    statusCode = 500;

    reason = 'Error connecting to database';

    constructor(message: string) {
        super(message);
        this.reason = message;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: this.reason },
        ];
    }
}
