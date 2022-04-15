import { FastifySchema } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { uuid_id } from './commons';

export const noteSchema = {
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
            id: uuid_id,
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
    tags: ['Note'],
    summary: 'get all `Notes`',
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
    tags: ['Note'],
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
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: uuid_id,
        },
    },
    body: {
        $ref: 'NoteUpdate',
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
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: uuid_id,
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
