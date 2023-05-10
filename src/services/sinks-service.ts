import { SinkDTO } from "./sink-dto"
import { SinkDAO } from "../dal/sink-dao"
import { TodoistApiTokensDAO } from "../dal/todoist-api-token-dao"
import { AddSinkData } from "../zod-schemas/add-sink"

export class SinksService {

    sinkDAO: SinkDAO

    constructor() {
        this.sinkDAO = new SinkDAO()
    }

    async getSinks(user_id: string): Promise<SinkDTO[]> {
        const sinks = await this.sinkDAO.getSinks(user_id)
        return sinks.map(sink => {
            return {
                id: sink.id,
                type: sink.type,
                name: sink.name,
                details: sink.details,
                is_primary: sink.is_primary
            }
        })
    }
    
    async createSink(user_id: string, params: AddSinkData): Promise<string> {
        const insertedApiToken = await new TodoistApiTokensDAO().addToken(user_id, params.api_token);
        if (insertedApiToken == undefined) {
            throw new Error("Failed to add Todoist API token");
        }
        return await this.sinkDAO.createSink({ 
            name: params.name,
            type: params.type, 
            owner_id: user_id, 
            details: {},
            access_id: insertedApiToken,
            access_type: "api_token"
        });
    }

    async getPrimarySink(user_id: string): Promise<SinkDTO | undefined> {
        const sink = await this.sinkDAO.getPrimarySink(user_id);
        if (sink === undefined) {
            return undefined;  /// @todo use transform that handles undefined
        }
        return {
            id: sink.id,
            type: sink.type,
            name: sink.name,
            details: sink.details,
            is_primary: true
        } 
    }
    async changePrimarySink(user_id: string, sink_id: string): Promise<void> {
        await this.sinkDAO.changePrimarySink(sink_id, user_id)
    }
}