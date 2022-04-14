import { FastifyInstance } from 'fastify';
import { notesRouter } from './noteRoute';

export default (app: FastifyInstance): void => {
    app.register(notesRouter, { prefix: 'notes', logLevel: 'info' });
};
