import NoteGenerator from "./generator";

export class Note {
    _title: string    /// @todo make private
    _content: string

    constructor(title: string, content: string) {
        this._title = title;
        this._content = content
    }

    get title(): string {
        return this._title
    }

    get content(): string {
        return this._content
    }
}

function buildTitle(content: string): string {
    return NoteGenerator.instance().generate(content);
}

export function buildNote(desc: string): Note {
    return new Note(buildTitle(desc), desc);
}
