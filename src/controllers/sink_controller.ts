import { SinkDTO } from "../sinks/sink"
import { SinkDAO } from "../sinks/dao/sink_dao"

export class SinkController {

    sinkDAO: SinkDAO

    constructor() {
        this.sinkDAO = new SinkDAO()
    }

    async getSinks(user_id: string): Promise<SinkDTO[]> {
        return await this.sinkDAO.getSinks(user_id)
    }
}