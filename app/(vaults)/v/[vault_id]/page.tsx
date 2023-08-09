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
  FiSettings,
  FiShare,
  FiTrash,
  FiTrash2,
} from "react-icons/fi";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CreateEntryButton } from "@/components/entries/CreateEntryButton";

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

  return (
    <>
      <div className="animate-in relative flex-grow flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
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
          <div className="flex gap-2 items-center">
            <div className="hidden md:block">
              <CreateEntryButton vaultId={vault.id} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-sm md:text-base"
                >
                  <FiMoreVertical size={22} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <FiShare className="mr-2" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FiSettings className="mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 hover:text-red-800">
                  <FiTrash2 className="mr-2" /> Delete vault
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TimelineFeed entries={entries} />
      </div>
      <div className="fixed bottom-6 md:hidden">
        <CreateEntryButton vaultId={vault.id} />
      </div>
    </>
  );
}
