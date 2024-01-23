import { ChatOpenAI } from "langchain/chat_models/openai";
import cors from 'cors';
import express from "express";
import { run } from "./VierGewinntAI.js";
import bodyParser from 'body-parser';

const app = express();

const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7
});
app.use(cors())
app.post('/api/suggestions', async (request, response) => {
    const prompt =
        `<{${request.body}>
The given JSON within the < > represents the game Connect Four. The players are represented by YELLOW and RED. EMPTY means there is no chip in the cell. 
The playground with row 0 is in the top and the row 6 in the bottom. Col 0 is in the very left and col 6 in the very right. Your task is to give a suggestion for the next turn. 
To play a turn the player chooses a column. Your suggestion should be made for the "otherPlayer". Return (and only return) your suggestion as a single JSON object with the keys "suggestedColumn" and "player". 
Print only and only the JSON object without anything else but the JSON. Remove all space and line breaks from your output`;
    const llmResult = await llm.predict(prompt);
    response.end(llmResult.match(/\{(.*?)\}/)[0]);
});

app.post('/api/playAI',bodyParser.json(), async (request, response) => {
    console.info(request.body.playground.currentPlayer)
    if (request.body) {
        const res = await run(request.body);
        console.info(res);
        response.end(JSON.stringify(res));
    }
});

app.use(bodyParser.json())

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`));