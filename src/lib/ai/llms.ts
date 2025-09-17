import { env } from "@/env";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
export const openrouter = createOpenRouter({
  apiKey: String(env.OPENAI_API_KEY),
});
