import { FastifySchema } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { uuid } from './commons';

export const note = {
    id: uuid,
    title: { type: 'string', minLength: 5, maxLength: 40 },
    description: { type: 'string', minLength: 10, maxLength: 100 },
};

const getNoteById: FastifySchema = {
    description: 'Retrieves a `Note` resource according to the `id` parameter',
    tags: ['note'],
    summary: 'Find a note by its ID',
    operationId: 'getNoteById',
    params: {
        type: 'object',
        properties: {
            id: uuid,
        },
    },
    response: {
        200: {
            $ref: 'NoteResponse',
        },
    },
};

const listNotes: FastifySchema = {
    description: 'This URI retrieves all `Notes` resource',
    tags: ['note'],
    summary: 'get all `Notes`',
    querystring: {
        id: {
            type: 'array',
            items: {
                type: 'string',
                format: 'uuid',
            },
        },
    },
    produces: ['application/json'],
    response: {
        200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
                notes: {
                    type: 'array',
                    items: {
                        $ref: 'NoteResponse',
                    },
                },
            },
        },
    },
};

const createNote: FastifySchema = {
    description: 'This URI creates a `Note` to persist in DB',
    tags: ['note'],
    summary: 'Save a new `Note`',
    body: {
        $ref: 'Note',
    },
    response: {
        201: {
            description: 'Succesful response',
            type: 'object',
        },
    },
};

const updateNoteById: FastifySchema = {
    description:
        'This URI updates a `Note` resource according to the `id` parameter',
    tags: ['note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: uuid,
        },
    },
    body: {
        description: 'Properties of `Note` object that needs to be updated',
        type: 'object',
        properties: {
            ...note,
        },
    },
    response: {
        204: {
            description: 'Succesful response',
            type: 'object',
        },
    },
};

const deleteNote: FastifySchema = {
    description:
        'This URI deletes a `Note` resource according to the `id` parameter',
    tags: ['note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: uuid,
        },
    },
    response: {
        204: {
            description: 'Succesful response',
            type: 'object',
        },
    },
};

export const getNoteByIdDef: FastifyRouteSchemaDef<typeof getNoteById> = {
    schema: getNoteById,
    method: 'getNoteById',
    url: '',
};
export const listNotesDef: FastifyRouteSchemaDef<typeof listNotes> = {
    schema: listNotes,
    method: 'listNotes',
    url: '',
};
export const createNoteDef: FastifyRouteSchemaDef<typeof createNote> = {
    schema: createNote,
    method: 'createNote',
    url: '',
};
export const updateNoteByIDef: FastifyRouteSchemaDef<typeof updateNoteById> = {
    schema: updateNoteById,
    method: 'UpdateNoteById',
    url: '',
};
export const deleteNoteByIdDef: FastifyRouteSchemaDef<typeof deleteNote> = {
    schema: deleteNote,
    method: 'deleteNoteById',
    url: '',
};
