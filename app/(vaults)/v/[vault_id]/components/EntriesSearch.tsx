"use client";

import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";

export default function EntriesSearch({
  vault_id,
  onResult,
}: {
  vault_id: string;
  onResult: (suggested_ids: any[] | null) => void;
}) {
  const { supabase } = useSupabase();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = useCallback(async () => {
    if (!input) {
      onResult(null);
      return;
    }
    setLoading(true);
    const { data: entries, error } = await supabase.functions.invoke(
      "search-entries",
      {
        body: {
          input,
          vault_id,
        },
      }
    );
    if (error) {
      console.error(error);
      return;
    }
    const parsedEntries = JSON.parse(entries);
    console.log(parsedEntries);
    onResult(parsedEntries.map((entry: any) => entry.id));
    setLoading(false);
  }, [supabase, setLoading, input, onResult, vault_id]);

  return (
    <div className="flex items-center gap-1">
      <Input
        placeholder="Search your vault with AI..."
        className="w-[300px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSearch()}
      />
      {!loading ? (
        <Button
          onClick={() => {
            setInput("");
            onResult(null);
          }}
          variant="secondary"
          size={"icon"}
        >
          <FiX />
        </Button>
      ) : (
        <Button variant="secondary" size={"icon"}>
          <FiLoader className="animate-spin" />
        </Button>
      )}
    </div>
  );
}
