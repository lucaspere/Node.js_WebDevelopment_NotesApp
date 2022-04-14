import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { SwaggerConfig } from './docs';
import api from './routes';
import { AppExecutor } from './server';

export const app = Fastify({
    logger: {
        prettyPrint: true,
        level: 'info',
    },
});

app.register(fastifySwagger, SwaggerConfig);
app.register(fastifyCors);
app.register(api, { prefix: 'api' });

async function main() {
    const appExecutor = new AppExecutor(app);
    try {
        await appExecutor.run();
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();
