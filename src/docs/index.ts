import { FastifyInstance } from 'fastify';
import {
    NoteResponseSchema,
    NoteSchema,
    NoteUpdateSchema,
} from './NoteSchemas';

export * as NoteRouteSchema from './NoteSchemas';

export const defineSchemas = (app: FastifyInstance): void => {
    app.addSchema(NoteSchema);
    app.addSchema(NoteResponseSchema);
    app.addSchema(NoteUpdateSchema);
};
