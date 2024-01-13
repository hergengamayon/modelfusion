import dotenv from "dotenv";
import { openaicompatible, streamText } from "modelfusion";

dotenv.config();

async function main() {
  const textStream = await streamText({
    model: openaicompatible
      .ChatTextGenerator({
        api: openaicompatible.FireworksAIApi(),
        provider: "openaicompatible-fireworksai",
        model: "accounts/fireworks/models/mistral-7b",
      })
      .withTextPrompt(),

    prompt: "Write a story about a robot learning to love",
  });

  for await (const textPart of textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
