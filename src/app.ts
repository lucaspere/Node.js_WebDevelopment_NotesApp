import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import api from './routes';
import { Server } from './server';
import { SwaggerConfig } from './swaggerConfig';

export const app = (
    opts: FastifyServerOptions = {
        logger: {
            prettyPrint: true,
            level: 'info',
        },
        ajv: {
            customOptions: {
                allErrors: true,
            },
        },
    },
): FastifyInstance => {
    const app = Fastify(opts);

    app.register(fastifySwagger, SwaggerConfig);
    app.register(fastifyCors);
    app.register(api, { prefix: 'api' });

    return app;
};

const server = app();
new Server(server).run().catch(err => {
    server.log.error(err);
    process.exit(1);
});
