import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class OtpExpiredError extends CustomError {
    statusCode = 401;

    constructor() {
        super('OTP has expired');
        Object.setPrototypeOf(this, OtpExpiredError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'OTP has expired' },
        ];
    }
}
