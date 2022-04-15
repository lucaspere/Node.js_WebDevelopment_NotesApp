import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { defineSchemas } from './docs';
import api from './routes';
import { AppExecutor } from './server';
import { SwaggerConfig } from './swaggerConfig';

export const app = Fastify({
    logger: {
        prettyPrint: true,
        level: 'info',
    },
});

async function main() {
    defineSchemas(app);
    app.register(fastifySwagger, SwaggerConfig);
    app.register(fastifyCors);
    app.register(api, { prefix: 'api' });

    const appExecutor = new AppExecutor(app);
    try {
        await appExecutor.run();
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();
