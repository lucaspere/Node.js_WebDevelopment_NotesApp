import { FastifySchema } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';

export const NoteSchema = {
    $id: 'Note',
    description: 'The `Note` object definition',
    type: 'object',
    required: ['title', 'description'],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
    },
};
export const NoteResponseSchema = {
    $id: 'NoteResponse',
    description: 'Response object of `Note` resource',
    type: 'object',
    required: ['id', 'title', 'description'],
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
    },
};

export const NoteUpdateSchema = {
    $id: 'NoteUpdate',
    description: 'Response object of `Note` resource',
    type: 'object',
    properties: NoteSchema.properties,
};

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
            $ref: NoteResponseSchema.$id,
        },
    },
};

const listNotesSchema: FastifySchema = {
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
                        $ref: NoteResponseSchema.$id,
                    },
                },
            },
        },
    },
};

const createNoteSchema: FastifySchema = {
    description: 'This URI creates a `Note` to persist in DB',
    tags: ['Note'],
    summary: 'Save a new `Note`',
    body: {
        $ref: NoteSchema.$id,
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
        'This URI updates a `Note` resource according to the `id` parameter',
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
    body: {
        $ref: NoteUpdateSchema.$id,
    },
    response: {
        204: {
            description: 'Succesful response',
            type: 'object',
        },
    },
};

const deleteNoteSchema: FastifySchema = {
    description:
        'This URI deletes a `Note` resource according to the `id` parameter',
    tags: ['Note'],
    summary: 'Query a `Note` by its `Id',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                description: 'The note identifier',
            },
        },
    },
    response: {
        204: {
            description: 'Succesful response',
            type: 'object',
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
