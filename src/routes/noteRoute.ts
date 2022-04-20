import { FastifyPluginAsync } from 'fastify';
import { NoteRouteSchema } from '../docs';
import { uuid } from '../docs/commons';
import { note } from '../docs/noteSchema';
import { NoteController } from '../controllers/';

const NoteSchema = {
    $id: 'Note',
    description: 'The `Note` object definition',
    type: 'object',
    required: ['title', 'description'],
    properties: note,
};

const NoteResponseSchema = {
    $id: 'NoteResponse',
    description: 'Response object of `Note` resource',
    type: 'object',
    required: ['id', 'title', 'description'],
    properties: {
        ...note,
        id: uuid,
    },
};

// eslint-disable-next-line require-await
export const notesRouter: FastifyPluginAsync = async app => {
    app.addSchema(NoteSchema);
    app.addSchema(NoteResponseSchema);

    app.get('/:id', NoteRouteSchema.getNoteByIdDef, NoteController.getNoteById);
    app.get('/', NoteRouteSchema.listNotesDef, NoteController.listNotes);
    app.post('/', NoteRouteSchema.createNoteDef, NoteController.createNote);
    app.patch(
        '/:id',
        NoteRouteSchema.updateNoteByIDef,
        NoteController.updateNoteById,
    );
    app.delete(
        '/:id',
        NoteRouteSchema.deleteNoteByIdDef,
        NoteController.deleteNoteById,
    );
};
