import { Note } from "./notes/note"

export interface NoteCreationResult {
    id?: string;
    url?: string;
}
export interface Sink {

    createNote(note: Note): Promise<NoteCreationResult>;
}

