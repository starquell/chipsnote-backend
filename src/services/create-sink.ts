import { Sink } from "./basic-sink"
import { TodoistSink } from "./todoist-sink"
import { ApiError, StatusCode } from "../utils/api-error";

export function createSink(type: string, access_type: string, access_id: string, details: object): Sink {
    if (type == "todoist") {
        return new TodoistSink(access_type, access_id, details);
    }
    throw new ApiError(StatusCode.ServerErrorNotImplemented, `sink type ${type} is not supported`);
}