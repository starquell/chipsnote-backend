import OpenAITitleGenerator from "./openai";

export default class NoteGenerator {

    private static _instance: NoteGenerator;

    static instance(): NoteGenerator {
        if (!NoteGenerator._instance) {
            NoteGenerator._instance = new NoteGenerator;
        }
        return NoteGenerator._instance;
    }

    private openaiGenerator: OpenAITitleGenerator 

    private constructor() {
        this.openaiGenerator = new OpenAITitleGenerator;
    }

    async generate(content: string): Promise<string> {
        return this.openaiGenerator.createTitle(content);
    }
}