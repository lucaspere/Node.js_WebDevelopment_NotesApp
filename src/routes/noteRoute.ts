import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { inspect } from "util";
import { Note } from "../models/Note";
import { NoteRepositry } from "../repository/NoteRepository";

const NoteRepo = new NoteRepositry();
export const notesRouter: FastifyPluginAsync = async (app, options) => {
    app.get("/:id", async (req, res) => {
        const params: any = req.params;
        const note = NoteRepo.find(params.id);

        res.send(note);
    })

    app.get("/", async (req, res) => {
        const note = NoteRepo.list();

        res.send(note);
    })

    app.post("/", async (req, res) => {
        try {
            const note = Note.from_JSON(JSON.stringify(req.body));
            NoteRepo.create(note);
            res.status(201).send();
        } catch(err) {
            req.log.error(`Fails in create Note with payload: ${inspect(req.body)}`)
            res.status(400).send({errors: err})
        }
        
    })

    app.patch("/:id", async (req, res) => {
        const {id} = req.params as {id: string};
        const payload = req.body as Partial<Note>

        NoteRepo.update(id, payload);

        res.status(204).send();
    })

    app.delete("/:id", async (req, res) => {
        const {id} = req.params as {id: string};

        NoteRepo.delete(id);

        res.status(204).send();
    })
}