export default class NoteGenerator {

    private static _instance: NoteGenerator;

    static instance(): NoteGenerator {
        return this._instance;
    }

    generate(content: string): string {
        /// @todo openai goes brrrrrr 
        const MAX_TITLE_LENGHT = 20;

        return content.length > MAX_TITLE_LENGHT ? content.substring(0, MAX_TITLE_LENGHT) + '...' : content;
    }
}