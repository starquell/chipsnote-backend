export class Note {
    _title: string    /// @todo make private
    _description: string

    constructor(title: string, desc: string) {
        this._title = title;
        this._description = desc
    }

    get title(): string {
        return this._title
    }

    get description(): string {
        return this._description
    }
};

function buildTitle(desc: string): string {
    /// here goes vano
    const MAX_TITLE_LENGHT = 20;

    return desc.length > MAX_TITLE_LENGHT ? desc.substring(0, MAX_TITLE_LENGHT) + '...' : desc;
}

export function buildNote(desc: string): Note {
    return new Note(buildTitle(desc), desc);
}
