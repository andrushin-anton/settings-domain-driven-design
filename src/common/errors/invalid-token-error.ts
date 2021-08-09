import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class InvalidTokenError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Invalid token provided');
        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'Invalid token provided' },
        ];
    }
}
