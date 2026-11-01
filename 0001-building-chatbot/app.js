/**
 * memory
 * system instruction
 * context
 * hallucination
 * history
 *
 */

import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import rl from "readline/promises";

const ai = new GoogleGenAI({});

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let previousInteractionId = null;

async function main(prompt) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",

      input: prompt,

      // Continue the previous conversation
      ...(previousInteractionId && {
        previous_interaction_id: previousInteractionId,
      }),

      system_instruction:
        "You are a coding tutor. Only answer coding-related questions. Otherwise, say: I will only answer coding-related questions.",
    });

    console.log("\nAI:", interaction.output_text);

    // Save the latest interaction ID
    previousInteractionId = interaction.id;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function startChat() {
  console.log("Coding Tutor Started! (Type 'exit' to quit)\n");

  while (true) {
    const prompt = await readline.question("You: ");

    if (prompt.trim().toLowerCase() === "exit") {
      break;
    }

    if (!prompt.trim()) continue;

    await main(prompt);
  }

  readline.close();
}

startChat();
