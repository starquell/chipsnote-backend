export class ApiError extends Error {

    private _httpCode: number;

    constructor(httpCode: number, message?: string) {
        super(message);
        this.name = 'ApiError';
        this._httpCode = httpCode;
    }

    public get httpCode(): number {
        return this._httpCode;
    }
}

export { StatusCode } from 'status-code-enum'