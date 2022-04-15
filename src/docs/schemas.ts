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
