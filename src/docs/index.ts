import { FastifyInstance } from 'fastify';
import * as schemas from './schemas';

export * as NoteRouteSchema from './NoteSchemas';

export const defineSchemas = (app: FastifyInstance): void => {
    Object.values(schemas).forEach(schema => app.addSchema(schema));
};
