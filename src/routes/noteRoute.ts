/* eslint-disable require-await */
import { FastifyPluginAsync } from 'fastify';
import { inspect } from 'util';
import { NoteRouteSchema } from '../docs';
import { Note } from '../models/Note';
import { NoteRepositry } from '../repository/NoteRepository';
import { uuid } from '../docs/commons';
import { note } from '../docs/noteSchema';

const NoteRepo = new NoteRepositry();

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

export const notesRouter: FastifyPluginAsync = async app => {
    app.addSchema(NoteSchema);
    app.addSchema(NoteResponseSchema);

    app.get('/:id', NoteRouteSchema.getNoteByIdDef, async (req, res) => {
        const params = req.params as { id: string };
        const note = NoteRepo.find(params.id);

        res.send(note);
    });

    app.get('/', NoteRouteSchema.listNotesDef, async (req, res) => {
        const notes = NoteRepo.list();

        res.send({ notes });
    });

    app.post('/', NoteRouteSchema.createNoteDef, async (req, res) => {
        try {
            const note = Note.from_JSON(JSON.stringify(req.body));
            NoteRepo.create(note);
            res.status(201);
        } catch (err) {
            req.log.error(
                `Fails in create Note with payload: ${inspect(req.body)}`,
            );
            res.status(400).send({ errors: err });
        }
    });

    app.patch('/:id', NoteRouteSchema.updateNoteByIDef, async (req, res) => {
        const { id } = req.params as { id: string };
        const payload = req.body as Partial<Note>;

        NoteRepo.update(id, payload);

        res.status(204).send();
    });

    app.delete('/:id', NoteRouteSchema.deleteNoteByIdDef, async (req, res) => {
        const { id } = req.params as { id: string };

        NoteRepo.delete(id);

        res.status(204).send();
    });
};
