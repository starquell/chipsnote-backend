import * as types from './types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect} from 'kysely'

interface Database {
    todoist_api_tokens: types.TodoistApiToken,
    primary_sinks: types.PrimarySink,
    sinks: types.Sink
}


const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.INTEGRATIONS_DATABASE_URL,
            keepAlive: true,
            max: 10,
            connectionTimeoutMillis: 0,
            idleTimeoutMillis: 0
        })
    })
})

export type KyselyDatabase = Kysely<Database>

export function sinksDB(): KyselyDatabase {
    return db
}