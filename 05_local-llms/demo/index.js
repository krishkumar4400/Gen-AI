import { Ollama } from "@langchain/ollama";

const llm = new Ollama({
  model: "llama3:latest",
  temperature: 0,
  maxRetries: 2,
});

const completion = await llm.invoke("what is AI");
console.log(completion);
