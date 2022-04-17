import { Level } from 'level';
import { Note } from '../models/Note';
import { Repository } from './Repository';

export const levelDB = new Level<string, Note>(
    process.env.LEVELDB_LOCATION || 'notes.level',
    {
        createIfMissing: true,
        valueEncoding: 'json',
    },
);
// TODO: Add Debugs
export default class LevelNoteRepository implements Repository<Note> {
    async clear(): Promise<void> {
        await levelDB.clear();
    }
    async create(newNote: Note): Promise<Note> {
        await levelDB.put(newNote.id, newNote);

        const note = await levelDB.get(newNote.id);

        return note;
    }
    async find(id: string): Promise<Note | undefined> {
        try {
            const note = await levelDB.get(id);
            return note;
        } catch (error) {
            const err = error as {
                code: string;
                error: string;
                message: string;
            };
            if (err.code === 'LEVEL_NOT_FOUND') return undefined;
        }
    }
    async list(): Promise<Note[]> {
        const notes: Note[] = [];
        for await (const note of levelDB.values()) {
            notes.push(note);
        }

        return notes;
    }
    async update(
        id: string,
        payload: Partial<Note>,
    ): Promise<Note | undefined> {
        const note = await levelDB.get(id);
        if (note) {
            const updatedNote = Object.assign(note, payload);

            await levelDB.put(id, updatedNote);

            return updatedNote;
        }
    }
    async delete(id: string): Promise<Note | undefined> {
        const note = await levelDB.get(id);

        if (note) {
            await levelDB.del(id);
            return note;
        }
    }
}
