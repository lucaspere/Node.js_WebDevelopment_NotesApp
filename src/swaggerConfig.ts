import { SwaggerOptions } from 'fastify-swagger';

export const SwaggerConfig: SwaggerOptions = {
    routePrefix: '/documentation',
    openapi: {
        info: {
            title: 'Note API',
            description:
                'This document defines the interface to be used for communication with API, according to the RESTFull standard',
            contact: {
                email: 'lucasfapereira@gmail.com',
                name: 'Lucas Pereira',
                url: 'https://www.linkedin.com/in/lucasfap/',
            },
            version: '1.0.0',
        },
        externalDocs: {
            url: 'https://swagger.io/specification/',
            description: 'The OpenAPI Specification',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        tags: [{ name: 'note', description: 'Note related end-points' }],
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
    refResolver: {
        buildLocalReference(json, baseUri, fragment, i) {
            return (json.$id as string) || `schema-${i}`;
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
