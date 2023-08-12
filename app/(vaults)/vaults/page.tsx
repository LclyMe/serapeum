import { CreateVaultButton } from "@/components/vaults/CreateVaultButton";
import { VaultCard } from "@/components/vaults/VaultCard";
import { getSession, getSupabase } from "@/app/session";
import { FiBookmark } from "react-icons/fi";

export default async function ValutsPage() {
  const supabase = await getSupabase();
  const session = await getSession();
  const { data: vaults } = await supabase
    .from("vaults")
    .select()
    .or(`public.eq.0,and(public.eq.1,created_by.eq.${session?.user.id})`)
    .limit(20);
  // const pinnedVaults = vaults.filter((vault) => vault.pinned);
  return (
    <div className="animate-in flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
      <div className="flex gap-2 justify-between">
        <h1 className="text-2xl md:text34xl font-semibold text-bold">
          My Vaults
        </h1>
        <CreateVaultButton />
      </div>
      {/* <div className="flex-shrink m-0">
        <span className="flex items-center text-lg">
          <FiBookmark className="mr-2" /> Pinned
        </span>
      </div> */}
      {/* <div className="grid md:grid-cols-3 gap-3">
        {pinnedVaults.map((vault) => (
          <VaultCard vault={vault} compact />
        ))}
      </div> */}
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" /> */}
      <div className="grid md:grid-cols-3 gap-3">
        {vaults?.map((vault) => (
          <VaultCard vault={vault} />
        ))}
      </div>
    </div>
  );
}
