import { Note } from "../models/Note";
import { Repository } from "./Repository";

const notesMock = [
    {
        id: '1',
        title: 'Dishonored',
        description: 'Melhor Game da vida'
    },
    {
        id: '2',
        title: 'Cyberpunk',
        description: 'Melhor jogo da vida'
    },
]

let count = 3;
export class NoteRepositry extends Repository<Note> {
    create(note: Note): void {
        notesMock.push(Object.assign({}, note, { id: String(count++) }));
    }
    find(id: string): Note {
        const note = notesMock.find(note => note.id === id);

        return Note.from_JSON(JSON.stringify(note));
    }
    list(): Note[] {
        return notesMock.map(note => Note.from_JSON(JSON.stringify(note)));
    }
    update(id: string, payload: Partial<Note>): void {
        const noteIdx = notesMock.findIndex(note => note.id === id);
        const noteUpdated = {
            ...notesMock[noteIdx],
            ...payload
        }
        notesMock[noteIdx] = Note.from_JSON(JSON.stringify(noteUpdated))
    }
    delete(id: string): void {
        const noteIdx = notesMock.findIndex(note => note.id === id);

        notesMock.splice(noteIdx, 1)
    }

}