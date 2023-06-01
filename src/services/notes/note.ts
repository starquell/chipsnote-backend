import NoteTitleGenerator from "./generator";

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

async function buildTitle(content: string): Promise<string> {
    return NoteTitleGenerator.instance().generate(content);
}

export async function buildNote(desc: string): Promise<Note> {
    const title: string = await buildTitle(desc);
    console.log(`title: ${title}, content: ${desc}`);
    return new Note(title, desc);
}
