import OpenAITitleGenerator from "./openai";

export default class NoteTitleGenerator {

    private static _instance: NoteTitleGenerator;

    static instance(): NoteTitleGenerator {
        if (!NoteTitleGenerator._instance) {
            NoteTitleGenerator._instance = new NoteTitleGenerator;
        }
        return NoteTitleGenerator._instance;
    }

    private openaiGenerator: OpenAITitleGenerator 

    private constructor() {
        this.openaiGenerator = new OpenAITitleGenerator;
    }

    async generate(content: string): Promise<string> {
        return this.openaiGenerator.createTitle(content);
    }
}