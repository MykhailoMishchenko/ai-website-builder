import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "@/inngest/client";
import { Sandbox, } from "@e2b/code-interpreter";
import { getSandboxUrl } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "backend-job" },
  { event: "backend/job" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("ai-website-builder-docker");
      return sandbox.sandboxId;
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.  You write code to build a website. Using the Next.js framework, you will build a website based on the user's request.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(`Build a website based on the following request: ${event.data.value}`);

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandboxUrl(sandboxId);
      const host =  sandbox.getHost(3000);
      return `https://${host}`;
    })

    return { output, sandboxUrl };
  },
);