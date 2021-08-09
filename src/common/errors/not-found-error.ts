import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'Not Found' },
        ];
    }
}
