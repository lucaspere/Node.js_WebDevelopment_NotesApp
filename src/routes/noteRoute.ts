import { FastifyPluginAsync } from 'fastify';
import { NoteRouteSchema } from '../docs';
import { Note } from '../models/Note';
import { uuid } from '../docs/commons';
import { note } from '../docs/noteSchema';
import { AddressInfo } from 'net';
import { NoteRepositoryFactory } from '../repository';

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
    const NoteRepo = await new NoteRepositoryFactory(
        process.env.REPOSITORY_TYPE || 'NoteMemoryRepository',
    ).create();

    app.addSchema(NoteSchema);
    app.addSchema(NoteResponseSchema);

    app.get('/:id', NoteRouteSchema.getNoteByIdDef, async (req, res) => {
        const params = req.params as { id: string };
        const note = await NoteRepo.find(params.id);

        if (!note) res.status(404).send();
        else res.send(note);
    });

    app.get('/', NoteRouteSchema.listNotesDef, async (req, res) => {
        const notes = await NoteRepo.list();

        res.send({ notes });
    });
    //f2831124-5b14-4520-9fbd-e213be151e4d
    app.post('/', NoteRouteSchema.createNoteDef, async (req, res) => {
        const newNote = Note.from_JSON(JSON.stringify(req.body));
        const note = await NoteRepo.create(newNote);
        const { address, port } = app.server.address() as AddressInfo;

        // TODO: Creates a response handler
        res.header('location', `${address}:${port}/api/notes/${note.id}`);
        res.status(201).send();
    });

    app.patch('/:id', NoteRouteSchema.updateNoteByIDef, async (req, res) => {
        const { id } = req.params as { id: string };
        const payload = req.body as Partial<Note>;

        const note = await NoteRepo.update(id, payload);

        if (!note) res.status(404).send();
        else res.status(204).send();
    });

    app.delete('/:id', NoteRouteSchema.deleteNoteByIdDef, async (req, res) => {
        const { id } = req.params as { id: string };

        const note = await NoteRepo.delete(id);
        if (!note) res.status(404).send();
        res.status(204).send();
    });
};
