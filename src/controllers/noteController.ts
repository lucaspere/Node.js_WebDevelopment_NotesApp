import { RouteHandler } from 'fastify';
import { AddressInfo } from 'net';
import { Note } from '../models/Note';
import { NoteMemoryRepository } from '../repository/NoteMemory';

const NoteRepo = new NoteMemoryRepository();

export const getNoteById: RouteHandler = async (req, res) => {
    const params = req.params as { id: string };
    const note = await NoteRepo.find(params.id);

    if (!note) res.status(404).send();
    else res.send(note);
};

export const listNotes: RouteHandler = async (req, res) => {
    const notes = await NoteRepo.list();

    res.send({ notes });
};

export const createNote: RouteHandler = async (req, res) => {
    const newNote = Note.from_JSON(JSON.stringify(req.body));
    const note = await NoteRepo.create(newNote);
    const { address, port } = res.server.server.address() as AddressInfo;

    // TODO: Creates a response handler
    res.header('location', `${address}:${port}/api/notes/${note.id}`);
    res.status(201).send();
};

export const updateNoteById: RouteHandler = async (req, res) => {
    const { id } = req.params as { id: string };
    const payload = req.body as Partial<Note>;

    const note = await NoteRepo.update(id, payload);

    if (!note) res.status(404).send();
    else res.status(204).send();
};

export const deleteNoteById: RouteHandler = async (req, res) => {
    const { id } = req.params as { id: string };

    const note = await NoteRepo.delete(id);
    if (!note) res.status(404).send();
    res.status(204).send();
};
