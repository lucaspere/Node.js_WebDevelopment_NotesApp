/* eslint-disable require-await */
import { FastifyPluginAsync } from 'fastify';
import { inspect } from 'util';
import { NoteRouteSchema } from '../docs';
import { Note } from '../models/Note';
import { NoteRepositry } from '../repository/NoteRepository';

const NoteRepo = new NoteRepositry();
const {
    getNoteByIdSchemaDef,
    createNoteSchemaDef,
    deleteNoteByIdSchemaDef,
    updateNoteByIdSchemaDef,
    listNotesSchemaDef,
} = NoteRouteSchema;

export const notesRouter: FastifyPluginAsync = async app => {
    app.get('/:id', getNoteByIdSchemaDef, async (req, res) => {
        const params = req.params as { id: string };
        const note = NoteRepo.find(params.id);

        res.send(note);
    });

    app.get('/', listNotesSchemaDef, async (req, res) => {
        const notes = NoteRepo.list();

        res.send({ notes });
    });

    app.post('/', createNoteSchemaDef, async (req, res) => {
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

    app.patch('/:id', updateNoteByIdSchemaDef, async (req, res) => {
        const { id } = req.params as { id: string };
        const payload = req.body as Partial<Note>;

        NoteRepo.update(id, payload);

        res.status(204).send();
    });

    app.delete('/:id', deleteNoteByIdSchemaDef, async (req, res) => {
        const { id } = req.params as { id: string };

        NoteRepo.delete(id);

        res.status(204).send();
    });
};
