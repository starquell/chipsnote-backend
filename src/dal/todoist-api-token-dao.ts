import { KyselyDatabase, sinksDB } from "./db/db"
import * as dbtypes from "./db/types"

export class TodoistApiTokensDAO {
    db: KyselyDatabase

    constructor() {
        this.db = sinksDB()
    }

    async addToken(user_id: string, token: string): Promise<string | undefined> {
        try {
            let res = await this.db.insertInto("todoist_api_tokens")
                .values({ user_id, api_token: token })
                .returning("id")
                .executeTakeFirstOrThrow();
            return res.id;
        }
        catch (e) {
            /// @todo what the fuck
            console.log(e);
            return undefined;
        }
    }
}