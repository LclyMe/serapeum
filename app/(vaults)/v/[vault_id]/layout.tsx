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
  children: React.ReactNode;
}

export default async function ValutLayout({
  params,
  children,
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

  return (
    <>
      <div className="animate-in relative flex-grow flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
        <div className="flex justify-between items-start">
          <div className="flex flex-row items-start">
            <div>
              <Orb
                text={vault.short_id || vault.id}
                className="h-7 w-7 mr-3 mt-1"
              />
            </div>
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
          <div className="flex gap-2 items-center">
            <div className="hidden md:block">
              <CreateEntryButton vaultId={vault.id} />
            </div>
            <VaultActionMenu vault={vault} />
          </div>
        </div>
        {children}
      </div>
      <div className="fixed bottom-6 md:hidden">
        <CreateEntryButton vaultId={vault.id} />
      </div>
    </>
  );
}
