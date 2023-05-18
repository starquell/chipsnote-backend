import { Sink, NoteCreationResult } from "./basic-sink";
import { TodoistApiTokensDAO } from "../dal/todoist-api-token-dao";
import { TodoistApi } from "@doist/todoist-api-typescript"
import { ApiError, StatusCode } from "../utils/api-error";
import { Note } from "../notes/note"

export class TodoistSink implements Sink {

    _access_id: string;   /// @todo make private

    constructor(access_type: string, access_id: string, details: object) {
        this._access_id = access_id;

        if (access_type != "api_token") {
            throw new ApiError(StatusCode.ServerErrorNotImplemented, "todoist sink supports only api_token access type");
        }
    }

    async createNote(note: Note): Promise<NoteCreationResult> {
        const token = await new TodoistApiTokensDAO().getToken(this._access_id);
        if (token === undefined) {
            throw new ApiError(StatusCode.ServerErrorInternal, "Todoist api token not found");
        }
        const api = new TodoistApi(token)
        try {
            const res = await api.addTask({
                content: note.title,    /// our title is todoist content (short text of task)
                description: note.content,   /// our content is todoist description (long text of task)
            });
            return {
                id: res.id,
                url: res.url,
            }
        }
        catch (e) {
            throw new ApiError(StatusCode.ServerErrorBadGateway, `todoist API error: ${e}`);
        }
    }
}