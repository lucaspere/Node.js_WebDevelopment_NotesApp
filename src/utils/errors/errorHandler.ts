import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BaseError } from './BaseError';
import { buildNotFoundError, buildError } from './errorBuilders';
import { HTTPErrors } from './HTTPErros';

export const customErrorHandler = (
    err: FastifyError,
    req: FastifyRequest,
    res: FastifyReply,
): void => {
    if (err.validation) {
        const requiredsFields = err.validation.filter(
            ({ keyword }) => keyword == 'required',
        );

        let validationError;
        if (requiredsFields.length) {
            validationError = buildError(
                HTTPErrors.BAD_REQUEST,
                requiredsFields,
            );
        } else {
            validationError = buildError(
                HTTPErrors.VALIDATION_ERROR,
                err.validation,
            );
        }

        res.status(validationError.statusCode).send(validationError);

        return;
    }
    if (err instanceof BaseError) {
        const { id } = req.params as { id: string };
        const notFoundError = buildNotFoundError({
            ...err,
            id,
            path: req.routerPath,
        });

        res.status(notFoundError.statusCode).send(notFoundError);
        return;
    }
};
