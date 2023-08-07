import Orb from "@/components/ui/Orb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateVaultButton } from "@/components/vaults/CreateVaultButton";
import { TimelineFeed } from "@/components/vaults/TimelineFeed";
import { VaultCard } from "@/components/vaults/VaultCard";
import { getSupabase } from "@/app/session";
import { notFound } from "next/navigation";
import {
  FiBookmark,
  FiLock,
  FiMenu,
  FiMoreHorizontal,
  FiMoreVertical,
  FiPlus,
} from "react-icons/fi";

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
    .limit(20);

  return (
    <div className="animate-in flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
      <div className="flex justify-between items-start">
        <div className="flex flex-row items-start">
          <Orb
            text={vault.short_id || vault.id}
            className="h-7 w-7 mr-3 mt-1"
          />
          <div>
            <h1 className="text-2xl md:text34xl font-semibold text-bold mb-1">
              {vault.name}
            </h1>
            <p className="opacity-60 text-sm mb-3">{vault.description}</p>
            <div className="flex flex-row items-center">
              <Badge variant="outline" className="mr-2">
                {vault.public ? <>Public</> : <>Private</>}
              </Badge>
              {vault.encrypted && (
                <Badge variant="outline" className="mr-2">
                  <FiLock className="mr-1" /> Encrypted
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button size={"sm"} className="text-sm md:text-base mr-2">
            <FiPlus className="mr-2" />
            New Entry
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-sm md:text-base"
          >
            <FiMoreVertical size={22} />
          </Button>
        </div>
      </div>
      <TimelineFeed entries={entries} />
    </div>
  );
}
