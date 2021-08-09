import { CustomError, SerializeErrorsToJson } from './custom-error';

export class BadArgumentError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadArgumentError.prototype);
    }

    serializeErrors(): SerializeErrorsToJson[] {
        return [
            { message: this.message },
        ];
    }
}
