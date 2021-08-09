import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors():SerializeErrorsToJson[] {
        return [
            { message: 'Not authorized' },
        ];
    }
}
