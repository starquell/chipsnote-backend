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
    /// here goes vano
    const MAX_TITLE_LENGHT = 20;

    return content.length > MAX_TITLE_LENGHT ? content.substring(0, MAX_TITLE_LENGHT) + '...' : content;
}

export function buildNote(desc: string): Note {
    return new Note(buildTitle(desc), desc);
}
