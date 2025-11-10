import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "@/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "backend-job" },
  { event: "backend/job" },
  async ({ event }) => {

    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize the input text into a readable, concise, simple content.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await summarizer.run(`Summarize the following text: ${event.data.value}`);

    return { output };
  },
);