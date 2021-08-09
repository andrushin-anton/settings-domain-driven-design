import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class OtpInvalidError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Codes do not match');
        Object.setPrototypeOf(this, OtpInvalidError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'Codes do not match' },
        ];
    }
}
