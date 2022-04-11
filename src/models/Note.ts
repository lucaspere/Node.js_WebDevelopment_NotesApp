export class Note {
    static id_seq = 0;
    constructor(title: string, description: string) {
        Object.defineProperties(this, {
            'id': {
                enumerable: false,
                configurable: true,
                value: Note.id_seq++,
                writable: false
            },
            'title': {
                enumerable: true,
                configurable: true,
                value: title,
                writable: true
            },
            'description': {
                enumerable: true,
                configurable: true,
                value: description,
                writable: true
            }
        })
    }

    get id(): string {
        return this.id;
    }

    get title(): string {
        return this.title
    }

    set title(title: string) {
        this.title = title
    }

    get description(): string {
        return this.description
    }

    set description(description: string) {
        this.description = description
    }

    static from_JSON(json: string): Note {
        const note = JSON.parse(json);
        const errors = [];

        if (typeof note !== 'object')
            errors.push(new Error("Invalid Note Object"))
        else {
            if (typeof note.title !== 'string')
                errors.push(new Error("Invalid {title} type. Expected a string"))
            if (typeof note.description !== 'string')
                errors.push(new Error("Invalid {description} type. Expected a string"))
        }

        if (errors.length !== 0) throw errors.map(error => ({ code: 400, msg: error.message }))
        else return new Note(note.title, note.description);
    }

    to_JSON() {
        return JSON.stringify(this)
    }
}
