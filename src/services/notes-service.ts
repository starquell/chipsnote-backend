import { CreateNoteData } from "../zod-schemas/create-note"
import { SinkDAO } from "../dal/sink-dao"
import { ApiError } from "../utils/api-error";
import { buildNote } from "../notes/note"
import { createSink } from "./sink"

export class NotesService {

    sinkDAO: SinkDAO

    constructor() {
        this.sinkDAO = new SinkDAO()
    }

    async createNote(user_id: string, data: CreateNoteData) {
        if (data.sink_id !== undefined) {
            throw new ApiError(501, "Not implemented for non-primary sink");
        }
        const userPrimarySink = await this.sinkDAO.getPrimarySink(user_id);
        if (userPrimarySink === undefined) {
            throw new ApiError(400, "User does not have primary sink");
        }
        const sink = createSink(
            userPrimarySink.type, userPrimarySink.access_type, 
            userPrimarySink.access_id, userPrimarySink.details
        )
        const note = buildNote(data.description);

         
        
        
    }
};