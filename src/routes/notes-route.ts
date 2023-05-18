import { PostNoteSchema } from "../zod-schemas/create-note";
import { NotesService } from "../services";
import { ApiError, StatusCode } from "../utils/api-error";
import express from 'express'

const notesRouter = express.Router()

notesRouter.post("/", async (req, res) => {
    const parsed = await PostNoteSchema.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(StatusCode.ClientErrorBadRequest).send(parsed.error.flatten())
        return;
    }
    const r = await new NotesService().createNote(
        req.user_id, req.body
    )
    res.json(r);
});

export default notesRouter;
