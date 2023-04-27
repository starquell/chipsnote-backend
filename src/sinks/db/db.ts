import * as types from './types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect, PostgresDialectConfig} from 'kysely'

interface Database {
    todoist_api_tokens: types.TodoistApiToken
    sinks: types.Sink
}


const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.INTEGRATIONS_DATABASE_URL
        })
    })
})

export type KyselyDatabase = Kysely<Database>

export function sinksDB(): KyselyDatabase {
    return db
}