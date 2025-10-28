import { cache } from "react";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
    return {
      // @see https://trpc.io/docs/server/context
        userId: "123"
    }
})

const t = initTRPC.create({
  // @see https://trpc.io/docs/server/data-transformer
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
