import { STATUS_CODES } from 'http';

export enum ERRORS_NAMES {
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
}

export type ErrorFormat = {
    name: string;
    type: string;
    code: number;
};
export class HTTPErrors {
    static RESOURCE_NOT_FOUND: ErrorFormat = {
        name: ERRORS_NAMES.RESOURCE_NOT_FOUND,
        type: STATUS_CODES[404] || '',
        code: 404,
    };

    static VALIDATION_ERROR: ErrorFormat = {
        name: ERRORS_NAMES.VALIDATION_ERROR,
        type: STATUS_CODES[422] || '',
        code: 422,
    };

    static BAD_REQUEST: ErrorFormat = {
        name: ERRORS_NAMES.BAD_REQUEST,
        type: STATUS_CODES[400] || '',
        code: 400,
    };
}
