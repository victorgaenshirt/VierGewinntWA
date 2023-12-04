const express = require('express');
const app = express();
const {OpenAI} = require("langchain/llms/openai");
var cors = require('cors')

const llm = new OpenAI({
    openAIApiKey: "++++++++++",
    temperature: 0.1
});
app.use(cors())
app.post('/api/suggestions', async (request, response) => {
    const prompt =
        `<{${request.body}>
The given JSON within the < > represents the game Connect Four. The players are represtened by YELLOW and RED. EMPTY means there is no chip in the cell. 
The playground with row 0 is in the top and the row 6 in the bottom. Col 0 is in the very left and col 6 in the very right. Your task is to give a suggestion for the next turn. 
To play a turn the player chooses a column. Your suggestion should be made for the "otherPlayer". Return (and only return) your suggestion as a single JSON object with the keys "suggestedColumn" and "player". Print only and only the JSON object without anything else but the JSON. Remove all space and line breaks from your output`;

    const llmResult = await llm.predict(prompt);
    response.end(llmResult.match(/\{(.*?)\}/)[0]);
});

app.listen(process.env.PORT || 3012, () => console.log(`App available on http://localhost:3000`))