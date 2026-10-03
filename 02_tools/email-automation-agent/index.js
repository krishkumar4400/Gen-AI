import "dotenv/config";
import { ChatGoogle } from "@langchain/google";
import { tool, createAgent, HumanMessage } from "langchain";
import sendMail from "./services/mail.service.js";
import * as z from "zod";
import readline from "readline/promises";

const emailTool = tool(sendMail, {
  name: "email-tool",
  description:
    "Use this tool to send an email. The input should be an object with the following properties: to (the recipient's email address)",
  schema: z.object({
    to: z.email().describe("The recipient's email address"),
    subject: z.string().describe("The subject of the email"),
    html: z.string().describe("The HTML content of the email"),
  }),
});

const model = new ChatGoogle({
  model: "gemini-3.8-flash",
  temperature: 0,
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [];

while (true) {
  const userInput = await rl.question("You: ");
  messages.push(new HumanMessage(userInput));
  const response = await agent.invoke({ messages });
  messages.push(response.messages[response.messages.length - 1]);
  //   console.log(response);
  console.log(response.messages[response.messages.length - 1].content);
}