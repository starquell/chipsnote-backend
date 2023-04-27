import { Generated, ColumnType } from 'kysely';

export interface TodoistApiToken {
    id: Generated<string> // uuid
    user_id: string,
    token: string
}

export interface Sink {
    id: Generated<string>  // uuid
    owner_id: string
    type: string
    name: string
    access_type: string
    access_id: string  // uuid
    details: object
}