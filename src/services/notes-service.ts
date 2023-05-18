import { CreateNoteData } from "../zod-schemas/create-note"
import { SinkDAO } from "../dal/sink-dao"
import { ApiError, StatusCode } from "../utils/api-error";
import { buildNote } from "../notes/note"
import { NoteCreationResult } from "./basic-sink"
import { createSink } from "./create-sink"

export class NotesService {

    sinkDAO: SinkDAO

    constructor() {
        this.sinkDAO = new SinkDAO()
    }

    async createNote(user_id: string, data: CreateNoteData): Promise<NoteCreationResult> {
        if (data.sink_id !== undefined) {
            throw new ApiError(StatusCode.ServerErrorNotImplemented, "Not implemented for non-primary sink");
        }
        const userPrimarySink = await this.sinkDAO.getPrimarySink(user_id);
        if (userPrimarySink === undefined) {
            throw new ApiError(StatusCode.ClientErrorBadRequest, "User does not have primary sink");
        }
        const sink = createSink(
            userPrimarySink.type, userPrimarySink.access_type, 
            userPrimarySink.access_id, userPrimarySink.details
        )
        const note = buildNote(data.content);
        const result = await sink.createNote(note);
        return result;        
    }
}