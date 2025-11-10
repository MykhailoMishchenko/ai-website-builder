"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Backend job started");
    }
  }));
  
  const [value, setValue] = useState("");

  const handleInvoke = () => {
    invoke.mutate({ value });
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled={invoke.isPending} onClick={handleInvoke}>
        Ask gpt
      </Button>
    </div>
  )
}

export default Page;  