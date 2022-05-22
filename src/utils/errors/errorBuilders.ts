import { ValidationResult } from 'fastify';
import { BaseError } from './BaseError';
import { ERRORS_NAMES, HTTPErrors, ErrorFormat } from './HTTPErros';

export type Details = {
    field: string;
    description: string;
    location: string | undefined;
};

export type AppError = {
    name: ERRORS_NAMES | string;
    message: string;
    statusCode: number;
    details: Details[];
};

export const buildError = (
    type: ErrorFormat,
    error: ValidationResult[] & { validationContext?: string },
): AppError => ({
    name: type.name,
    message: type.type,
    statusCode: type.code,
    details: error.map(err => ({
        field: `${err.dataPath}`,
        description: err.message,
        location: error.validationContext,
    })),
});

export const buildNotFoundError = (
    error: BaseError & { id: string; path: string },
): AppError => ({
    ...error,
    message: HTTPErrors.RESOURCE_NOT_FOUND.type,
    details: [
        {
            field: '/id',
            description: error.message,
            location: error.path,
        },
    ],
});
