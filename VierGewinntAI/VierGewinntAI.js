import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new OpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0.7,
    verbose: false
});

const prompt = PromptTemplate.fromTemplate(`You are playing a game of Connect Four. You are the {player} player. You are in the middle of the game. The playground looks like this:
    
    {playground}
    
    You can use the playground above to make your decision. Print your move in this format:
    "{{"row": 4, "col": 2, "chip": "YELLOW"}}" or "{{"row": 6, "col": 2, "chip": "RED"}}"
    
    Now make your turn: 
    `);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

export const run = async (playground) => {
    const result = await chain.invoke({
        playground: JSON.stringify(playground),
        player: playground.playground.currentPlayer.chipColor
    });

    return result;
};