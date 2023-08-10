import Orb from "@/components/ui/Orb";
import { Badge } from "@/components/ui/badge";
import { TimelineFeed } from "@/components/vaults/TimelineFeed";
import { getSupabase } from "@/app/session";
import { notFound } from "next/navigation";
import { FiLock } from "react-icons/fi";
import { CreateEntryButton } from "@/components/entries/CreateEntryButton";
import VaultActionMenu from "@/components/vaults/VaultActionMenu";

interface VaultPageProps {
  params: { vault_id: string };
}

export default async function ValutPage({ params }: VaultPageProps) {
  const supabase = await getSupabase();
  const isShortId = params.vault_id.length === 10;
  const { data: vault } = await supabase
    .from("vaults")
    .select()
    .eq(isShortId ? "short_id" : "id", params.vault_id)
    .single();

  if (!vault) {
    return notFound();
  }

  const { data: entries } = await supabase
    .from("entries")
    .select()
    .match({ vault_id: vault.id })
    .order("created_at", { ascending: false })
    .limit(20);

  const views = ["timeline", "tiles", "map"];

  return <TimelineFeed entries={entries} />;
}
