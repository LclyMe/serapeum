"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cookies } from "next/headers";
import { FiClipboard, FiTrash2 } from "react-icons/fi";
import { revalidatePath } from "next/cache";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";

export default function ApiKey({ apiKey }: { apiKey: any }) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key).then(
      function () {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the "copied" state after 2 seconds
      },
      function (err) {
        console.error("Unable to copy to clipboard", err);
      }
    );
  };
  const deleteKey = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", apiKey.id);
    if (error) {
      console.log(error);
    }
    router.refresh();
  };
  return (
    <div className="flex gap-1">
      <Input className="text-foreground/70" value={apiKey.key} readOnly />
      <Button
        onClick={copyToClipboard}
        variant="secondary"
        size="icon"
        className="shrink-0"
      >
        <FiClipboard className="h-4 w-4" />
      </Button>
      <form action={deleteKey}>
        <Button variant="ghost" size="icon" className="shrink-0">
          <FiTrash2 type="submit" className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
