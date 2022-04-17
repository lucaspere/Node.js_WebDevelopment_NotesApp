import { v4 as uuid } from 'uuid';

export class Note {
    constructor(title: string, description: string, id?: string) {
        Object.defineProperties(this, {
            id: {
                enumerable: true,
                configurable: true,
                value: id ? id : uuid(),
                writable: false,
            },
            title: {
                enumerable: true,
                configurable: true,
                value: title,
                writable: true,
            },
            description: {
                enumerable: true,
                configurable: true,
                value: description,
                writable: true,
            },
        });
    }

    get id(): string {
        return this.id;
    }

    get title(): string {
        return this.title;
    }

    set title(title: string) {
        this.title = title;
    }

    get description(): string {
        return this.description;
    }

    set description(description: string) {
        this.description = description;
    }

    static from_JSON(json: string): Note {
        const note = JSON.parse(json);

        return new Note(note.title, note.description, note.id);
    }

    to_JSON(): string {
        return JSON.stringify(this);
    }
}
