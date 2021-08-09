import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class UserLockedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('This user account has been locked');
        Object.setPrototypeOf(this, UserLockedError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'This user account has been locked' },
        ];
    }
}
