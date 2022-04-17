import { Note } from '../models/Note';
import { Repository } from './Repository';

const notes: Note[] = [];

export class NoteRepositry implements Repository<Note> {
    create(note: Note): Note {
        notes.push(note);
        return notes[notes.length - 1] as Note;
    }
    find(id: string): Note | undefined {
        const note = notes.find(note => note.id === id);
        if (note) return Note.from_JSON(JSON.stringify(note));
    }
    list(): Note[] {
        return notes.map(note => Note.from_JSON(JSON.stringify(note)));
    }
    update(id: string, payload: Partial<Note>): Note | undefined {
        const noteIdx = notes.findIndex(note => note.id === id);
        if (noteIdx !== -1) {
            const noteUpdated = {
                ...notes[noteIdx],
                ...payload,
            };
            notes[noteIdx] = Note.from_JSON(JSON.stringify(noteUpdated));

            return notes[noteIdx];
        }
    }
    delete(id: string): Note | undefined {
        const noteIdx = notes.findIndex(note => note.id === id);
        if (noteIdx !== -1) return notes.splice(noteIdx, 1)[0];
    }
}
