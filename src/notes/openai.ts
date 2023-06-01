import {Configuration, OpenAIApi} from 'openai'

// there are OpenAI completion parameters below
// see their meaning: https://platform.openai.com/docs/api-reference/completions

const prompt: string = `Create task for my to-do list based on message from other people to me. 
Task name should answer the question: "What one need to do?"
Consider the language of the message and use the same language in task name.

Message: Hey, could you review my ticket https://gmdhsoftware.atlassian.net/browse/SL-4382?
Task name: Review ticket https://gmdhsoftware.atlassian.net/browse/SL-4382

Message: в 17:00 мітинг про архітектуру імпорта
Task name: Зайти на мітинг про архітектуру імпорта о 17:00

Message: do not forget https://docs.google.com/spreadsheets/d/1W2NJ9ByAzFoMISBJ9uBjrLYtVaIEEnIcoTSGouX2CA0/edit?usp=sharing
Task name: Work with document https://docs.google.com/spreadsheets/d/1W2NJ9ByAzFoMISBJ9uBjrLYtVaIEEnIcoTSGouX2CA0/edit?usp=sharing

Message: тут ось так, зараз вільна ця задача
якщо її ніхто не візьме до того, як ти завершиш частину з екшнами для проектів, то можеш взяти її
https://gmdhsoftware.atlassian.net/browse/SL-3912
Task name: Взяти задачу https://gmdhsoftware.atlassian.net/browse/SL-3912 

Message:https://rogermartin.medium.com/business-model-generation-playing-to-win-d50c33d6dfeb
Task name: Take a look at https://rogermartin.medium.com/business-model-generation-playing-to-win-d50c33d6dfeb

Message:`;

const model: string = 'text-davinci-003';

const temperature: number = 0.3;

const maxTokens: number = 100;

const topP: number = 0.5;

const frequencyPenalty: number = 0.5;

const presencePenalty: number = 0.3;

const stop: Array<string> = ['\n']

function promptForNote(noteContent: string): string {
    return prompt + noteContent + "\nTask name: ";
}

function completionParams(noteContent: string) {
    return {
        model: model,
        prompt: promptForNote(noteContent),
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
        stop: stop,
    }
}


export default class OpenAITitleGenerator {

    private config: Configuration;
    private api: OpenAIApi;

    constructor() {
        this.config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.api = new OpenAIApi(this.config);
    }

    async createTitle(content: string): Promise<string> {
        const fallbackTitle = () => {
            const MAX_TITLE_LENGHT = 20;
            return content.length > MAX_TITLE_LENGHT ? content.substring(0, MAX_TITLE_LENGHT) + '...' : content;
        };
        
        try {
            if (!this.config.apiKey) {
                throw Error("OpenAI API token is not provided");
            }
            const completion = await this.api.createCompletion(
                completionParams(content)
            );
            const maybeGeneratedTitle = completion.data.choices[0].text;
            if (!maybeGeneratedTitle) {
                console.log('Error: Generated title is empty')
                return fallbackTitle();
            }
            return maybeGeneratedTitle.trim();
        } catch (error) {
            console.log(`Error: ${error}`)
            return fallbackTitle();
        }        
    }
}