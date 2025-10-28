"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Backend job started");
    }
  }));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: "Mishunchik Prefetch" })}>
        Invoke backend job
      </Button>
    </div>
  )
}

export default Page;  