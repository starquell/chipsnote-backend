import { ApiError } from "../utils/api-error";
import { KyselyDatabase, sinksDB } from "./db/db"

export class TodoistApiTokensDAO {
    db: KyselyDatabase

    constructor() {
        this.db = sinksDB()
    }

    async addToken(user_id: string, token: string): Promise<string | undefined> {
        try {
            const res = await this.db.insertInto("todoist_api_tokens")
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

    async getToken(id: string): Promise<string | undefined>
    {
        try {
            const res = await this.db.selectFrom("todoist_api_tokens")
                .select(["api_token"])
                .where("id", "=", id)
                .executeTakeFirstOrThrow();
            return res.api_token;
        }
        catch (e) {
            console.log(e);
            return undefined;
        }
    }
}