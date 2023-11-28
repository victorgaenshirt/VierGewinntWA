import {OpenAI} from "langchain/llms/openai";

const llm = new OpenAI({
    openAIApiKey: "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",
    temperature: 0.9
});


const text =
    "What would be a good company name for a company that makes colorful socks?";
console.log((text))
//const llmResult = await llm.predict(text);
/*
  "Feetful of Fun"
*/




