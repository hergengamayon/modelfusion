---
sidebar_position: 5
---

# Chatbot (Terminal)

[Source Code](https://github.com/lgrammel/modelfusion/tree/main/examples/chatbot-terminal)

> _Terminal app_, _chat_, _llama.cpp_

A terminal chat with a Llama.cpp server backend.

## Code (Llama 2)

```ts
import {
  ChatToLlama2PromptMapping,
  LlamaCppTextGenerationModel,
  streamText,
  trimChatPrompt,
} from "modelfusion";
import * as readline from "node:readline/promises";

const systemPrompt = `You are a helpful, respectful and honest assistant.`;

const chat = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const messages: Array<{ user: string } | { ai: string }> = [];

  while (true) {
    const userInput = await chat.question("You: ");

    messages.push({ user: userInput });

    const model = new LlamaCppTextGenerationModel({
      contextWindowSize: 4096, // Llama 2 context window size
      nPredict: 512,
    }).mapPrompt(ChatToLlama2PromptMapping());

    const { textStream } = await streamText(
      model,
      await trimChatPrompt({
        prompt: [{ system: systemPrompt }, ...messages],
        model,
      })
    );

    let fullResponse = "";
    process.stdout.write("\nAI : ");
    for await (const textFragment of textStream) {
      fullResponse += textFragment;
      process.stdout.write(textFragment);
    }
    process.stdout.write("\n\n");
    messages.push({ ai: fullResponse });
  }
})();
```