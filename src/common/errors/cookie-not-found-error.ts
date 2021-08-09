import { CustomError, SerializeErrorsToJson } from './custom-error';

export class CookieNotFoundError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, CookieNotFoundError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: this.message },
        ];
    }
}
