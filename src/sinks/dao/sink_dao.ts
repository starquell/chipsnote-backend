import { SinkDTO } from "../sink"
import { KyselyDatabase, sinksDB } from "../db/db"

export class SinkDAO {
    db: KyselyDatabase

    constructor() {
        this.db = sinksDB()
    }

    async getSinks(user_id: string): Promise<SinkDTO[]> {
        const sinks = await this.db
            .selectFrom("sinks").where("owner_id", "=", user_id)
            .selectAll().execute()
        return sinks.map(sink => {
            return {
                id: sink.id,
                type: sink.type,
                name: sink.name,
                details: sink.details
            }
        })
    }
}