import { CustomError, SerializeErrorsToJson } from './custom-error';

export class UserNotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('User Not Found');
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'User Not Found' },
        ];
    }
}
