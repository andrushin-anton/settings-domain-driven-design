import {
    CustomError,
    SerializeErrorsToJson,
} from './custom-error';

export class RequiredDeviceVerificationError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Required device verification');
        Object.setPrototypeOf(this, RequiredDeviceVerificationError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: 'Required device verification' },
        ];
    }
}
