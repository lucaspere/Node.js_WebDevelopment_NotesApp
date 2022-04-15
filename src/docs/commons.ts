export const noteSchema = {
    title: { type: 'string', minLength: 5, maxLength: 40 },
    description: { type: 'string', minLength: 10, maxLength: 100 },
};

export const uuid_id = {
    type: 'string',
    format: 'uuid',
    description: 'UUID identifier of the resource',
};
