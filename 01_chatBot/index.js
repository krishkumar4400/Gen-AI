// import "dotenv/config"
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({});

// const interaction = await ai.interactions.create({
//   model: "gemini-2.5-flash",
//   input: [
//     {
//       role: "user",
//       content: "what is my name",
//     },
//     {
//       role: "model",
//       content:
//         "I don't know your name because you haven't told me yet! What should I call you?",
//     },
//     {
//         role: "user",
//         content: "My name is krish"
//     },
//   ],
// });

// console.log(interaction.output_text);

import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// TURN 1
const turn1 = await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: "Hi, my name is Krish.",
});

console.log("Turn 1:", turn1.output_text);

// TURN 2
const turn2 = await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: "I am a CSE student.",
  previous_interaction_id: turn1.id,
});

console.log("Turn 2:", turn2.output_text);

// TURN 3
const turn3 = await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: "What do you know about me?",
  previous_interaction_id: turn2.id,
});
// TURN 4
const turn4 = await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: "write a production grade Dockerfile to deploy a spring boot application?",
  previous_interaction_id: turn3.id,
});

console.log("Turn 3:", turn3.output_text);
console.log("Turn 4:", turn4.output_text);
