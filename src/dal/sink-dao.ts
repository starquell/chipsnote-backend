import { KyselyDatabase, sinksDB } from "./db/db"
import { sql } from "kysely"
import { ApiError } from "../utils/api-error"

export class SinkDAO {
    db: KyselyDatabase

    constructor() {
        this.db = sinksDB()
    }

    async getSinks(user_id: string) {
        const res = await this.db
            .selectFrom("sinks")
            .leftJoin("primary_sinks", "primary_sinks.sink_id", "sinks.id")
            .select(["id", "owner_id", "type", "name", "access_type", "access_id", "details"])
            .select(sql<boolean>`primary_sinks.sink_id IS NOT NULL AND primary_sinks.user_id = sinks.owner_id`.as("is_primary"))
            .where("owner_id", "=", user_id)
            .execute()
        return res
    }

    async createSink(sink: any): Promise<string> {
        try {
            const res = await this.db.insertInto("sinks").values(sink).returning("id").executeTakeFirstOrThrow();
            if ((await this.getSinks(sink.owner_id)).length == 1) {
                await this.changePrimarySink(res.id, sink.owner_id);
            }
            return res.id;
        }
        catch (e: any) {
            if (e.constraint == 'name_unique_constraint') {
               throw new ApiError(409, `Sink with name ${sink.name} already exists.`)
            }
            throw e
        }
    }

    async getPrimarySink(user_id: string) {
        const res = await this.db.selectFrom("primary_sinks")
                    .innerJoin("sinks", "sinks.id", "primary_sinks.sink_id")
                    .where("user_id", "=", user_id)
                    .select(["id", "owner_id", "type", "name", "access_type", "access_id", "details"])
                    .executeTakeFirst();
        return res;
    }

    async changePrimarySink(sink_id: string, user_id: string): Promise<void> {
        try {
            await this.db.insertInto("primary_sinks").values({user_id, sink_id})
                .onConflict((oc) => oc
                    .column('user_id')
                    .doUpdateSet({ sink_id: sink_id})
                ).executeTakeFirstOrThrow()
        }
        catch (e: any) {
            if (e.constraint == 'sink_id_foreign_key') {
                throw new ApiError(404, `Sink with id ${sink_id} does not exist.`)
             }
            throw e;
        }
    }
}

