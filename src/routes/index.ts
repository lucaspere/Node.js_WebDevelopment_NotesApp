import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { notesRouter } from "./noteRoute";

export default async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.register(notesRouter, { prefix: 'notes', logLevel: 'info' })
}