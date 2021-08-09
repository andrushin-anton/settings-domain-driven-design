import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to db');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: this.reason },
        ];
    }
}
