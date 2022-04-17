import { Note } from '../models/Note';
import { Repository } from './Repository';

const notes: Note[] = [];

export class NoteMemoryRepository implements Repository<Note> {
    clear(): Promise<void> {
        notes.splice(0, notes.length);

        return Promise.resolve();
    }
    create(note: Note): Promise<Note> {
        notes.push(note);

        return Promise.resolve(notes[notes.length - 1] as Note);
    }
    find(id: string): Promise<Note | undefined> {
        const note = notes.find(note => note.id === id);
        if (note) return Promise.resolve(Note.from_JSON(JSON.stringify(note)));

        return Promise.resolve(undefined);
    }
    list(): Promise<Note[]> {
        return Promise.resolve(
            notes.map(note => Note.from_JSON(JSON.stringify(note))),
        );
    }
    update(id: string, payload: Partial<Note>): Promise<Note | undefined> {
        const noteIdx = notes.findIndex(note => note.id === id);
        if (noteIdx !== -1) {
            const noteUpdated = {
                ...notes[noteIdx],
                ...payload,
            };
            notes[noteIdx] = Note.from_JSON(JSON.stringify(noteUpdated));

            return Promise.resolve(notes[noteIdx]);
        }

        return Promise.resolve(undefined);
    }
    delete(id: string): Promise<Note | undefined> {
        const noteIdx = notes.findIndex(note => note.id === id);
        if (noteIdx !== -1) {
            const note = notes.splice(noteIdx, 1)[0];

            return Promise.resolve(note);
        }

        return Promise.resolve(undefined);
    }
}
