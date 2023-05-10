import { ApiError } from "../utils/api-error";
import { Note } from "../notes/note"

export interface Sink {
    createNote(note: Note): void;
}

class TodoistSink implements Sink {

    _access_id: string;

    constructor(access_type: string, access_id: string, details: object) {
        this._access_id = access_id;

        if (access_type != "api_token") {
            throw new ApiError(500, "todoist sink supports only api_token access type");
        }
    }

    createNote(note: Note): void {
        /// @todo
    }
}

export function createSink(type: string, access_type: string, access_id: string, details: object): Sink {
    if (type == "todoist") {
        return new TodoistSink(access_type, access_id, details);
    }
    throw new ApiError(500, `sink type ${type} is not supported`);
}