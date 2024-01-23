import {OpenAI} from "langchain/llms/openai";
import {PromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";

const model = new OpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0.7,
    verbose: false
});

const prompt = PromptTemplate.fromTemplate(`
    You are playing a game of Connect Four. You are the {player} player. You are in the middle of the game. 
    The playground looks like this:
    
    {playground}
    
    The objective of the game is to align four of one's own colored chips in a row, either horizontally,
    vertically, or diagonally, before the opponent. Players take turns dropping a chip into one of the seven columns (0-6), 
    and the chip occupies the lowest available space in that column. The game ends when one player achieves a 
    connect-four or the board is full, resulting in a draw.
    
    To understand how the playground is drawed:
    row: 0, col:0 is the top left field
    row: 6, col:0 is the bottom left field
    row: 0, col:6 is the top right field
    row: 6, col:6 is the bottom right field

    
    You can use the playground above to make your decision. Print your move in this format:
    "{{"row": 4, "col": 2, "chip": "YELLOW"}}" or "{{"row": 6, "col": 2, "chip": "RED"}}"
    
    You must make your decision by selecting a column. After choosing a column, the chip has to drop
    in the next possible row. As above showed the highest row (6) is the bottom where a chip has to be dropped
    if the column is completely empty.
    
    Make the game as hard as possible, challenge the Human! Your strategy is to be defensive, that means to block the 
    human to connect four chips. E.g. Let's say the human has following chips played. In other words he played three times
    in the first column, attempting to make a vertical connect four.
    [...,
    {{"row": 4, "col": 0, "chip": "YELLOW"}},
    ...,
    {{"row": 5, "col": 0, "chip": "YELLOW"}},
    ...,
    {{"row": 6, "col": 0, "chip": "YELLOW"}},
    ...]
    
    You should now block his win by playing {{"row": 3, "col": 0, "chip": "RED"}},
    
    
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