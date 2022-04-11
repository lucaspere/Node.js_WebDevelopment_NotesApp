import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import api from './routes'
import { server } from './server';

export const app = Fastify({
    logger: {
        prettyPrint: true,
        level: 'info',
    },
});

app.register(fastifyCors);
app.register(api, { prefix: 'api' })

server(app);