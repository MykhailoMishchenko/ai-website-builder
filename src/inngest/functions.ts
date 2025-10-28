import { inngest } from "@/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Imagine we are doing some heavy computation here
    await step.sleep("wait-a-moment", "30s");

    // Imagine we are doing some transcript step
    await step.sleep("wait-a-moment", "10s");

    // Imagine we are doing some summary step
    await step.sleep("wait-a-moment", "5s");

    return { message: `Hello ${event.data.email}!` };
  },
);