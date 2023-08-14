import { TimelineFeed } from "@/components/vaults/TimelineFeed";
import { getSupabase } from "@/app/session";
import { notFound } from "next/navigation";
import VaultMap from "./components/VaultMap";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface VaultPageProps {
  params: { vault_id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const getChronologicalEntries = async (vaultId: string) => {
  const supabase = await getSupabase();
  const { data: entries } = await supabase
    .from("entries")
    .select()
    .match({ vault_id: vaultId })
    .not("related_date", "is", "null")
    .order("related_date", {
      ascending: false,
    })
    .limit(50);
  return entries;
};

const getLatestEntries = async (vaultId: string) => {
  const supabase = await getSupabase();
  const { data: entries } = await supabase
    .from("entries")
    .select()
    .match({ vault_id: vaultId })
    .order("created_at", {
      ascending: false,
    })
    .limit(50);
  return entries;
};

const getMapEntries = async (vaultId: string) => {
  const supabase = await getSupabase();
  const { data: entries, error } = await supabase.rpc(
    "get_vault_location_points",
    {
      vault_id: vaultId,
    }
  );
  console.log("location entries", entries, error);
  return entries;
};

export default async function ValutPage({
  params,
  searchParams,
}: VaultPageProps) {
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

  const isChronological = searchParams?.view === "chron";
  const isMap = searchParams?.view === "map";

  let entries;

  if (isChronological) {
    entries = await getChronologicalEntries(vault.id);
  } else if (isMap) {
    entries = await getMapEntries(vault.id);
  } else {
    entries = await getLatestEntries(vault.id);
  }

  if (isMap && entries && entries.length > 0) {
    return (
      <div className="h-full">
        <div className="mb-3">
          <Link
            className="flex items-center opacity-70"
            href={"/v/" + vault.short_id}
          >
            <FiArrowLeft className="mr-1" /> Back
          </Link>
        </div>
        <VaultMap entries={entries} />
      </div>
    );
  }

  return <TimelineFeed entries={entries} vault={vault} />;
}
