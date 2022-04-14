import { SwaggerOptions } from 'fastify-swagger';

export const config: SwaggerOptions = {
    routePrefix: '/documentation',
    openapi: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [{ name: 'Note', description: 'Note related end-points' }],
        components: {
            securitySchemes: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header',
                },
            },
        },
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    exposeRoute: true,
};
