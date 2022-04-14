import { FastifyInstance } from 'fastify';
import { notesRouter } from './noteRoute';

export default async (app: FastifyInstance): Promise<void> => {
    await app.register(notesRouter, { prefix: 'notes', logLevel: 'info' });
};
