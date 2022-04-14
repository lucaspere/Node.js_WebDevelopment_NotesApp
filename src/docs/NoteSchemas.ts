import { FastifySchema } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';

const getNoteByIdSchema: FastifySchema = {
    description:
        'This URI retrieves a `Note` resource according to the `id` parameter',
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'The note identifier',
            },
        },
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
            },
        },
    },
};

const listNotesSchema: FastifySchema = {
    description:
        'This URI retrieves a `Note` resource according to the `id` parameter',
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'The note identifier',
            },
        },
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
            },
        },
    },
};

const createNoteSchema: FastifySchema = {
    description: 'This URI creates a `Note` to persist in DB',
    tags: ['Note'],
    summary: 'Save a new `Note`',
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
        },
    },
    response: {
        201: {
            description: 'Succesful response',
            type: 'object',
        },
    },
};

const updateNoteByIdSchema: FastifySchema = {
    description:
        'This URI retrieves a `Note` resource according to the `id` parameter',
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'The note identifier',
            },
        },
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
            },
        },
    },
};

const deleteNoteSchema: FastifySchema = {
    description:
        'This URI retrieves a `Note` resource according to the `id` parameter',
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'The note identifier',
            },
        },
    },
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
            },
        },
    },
};

export const getNoteByIdSchemaDef: FastifyRouteSchemaDef<
    typeof getNoteByIdSchema
> = {
    schema: getNoteByIdSchema,
    method: 'getNoteById',
    url: '',
};
export const listNotesSchemaDef: FastifyRouteSchemaDef<typeof listNotesSchema> =
    {
        schema: listNotesSchema,
        method: 'listNotes',
        url: '',
    };
export const createNoteSchemaDef: FastifyRouteSchemaDef<
    typeof createNoteSchema
> = {
    schema: createNoteSchema,
    method: 'createNote',
    url: '',
};
export const updateNoteByIdSchemaDef: FastifyRouteSchemaDef<
    typeof updateNoteByIdSchema
> = {
    schema: updateNoteByIdSchema,
    method: 'UpdateNoteById',
    url: '',
};
export const deleteNoteByIdSchemaDef: FastifyRouteSchemaDef<
    typeof deleteNoteSchema
> = {
    schema: deleteNoteSchema,
    method: 'deleteNoteById',
    url: '',
};
