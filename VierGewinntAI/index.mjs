import {OpenAI} from "langchain/llms/openai";

const llm = new OpenAI({
    openAIApiKey: "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"
});


const text =
    "What would be a good company name for a company that makes colorful socks?";
console.log((text));
const llmResult = await llm.predict(text);
console.log(llmResult);





