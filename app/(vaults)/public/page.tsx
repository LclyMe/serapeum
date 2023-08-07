import { CreateVaultButton } from "@/components/vaults/CreateVaultButton";
import { VaultCard } from "@/components/vaults/VaultCard";
import { getSupabase } from "@/app/session";

export default async function PublicValutsPage() {
  const supabase = await getSupabase();
  const { data: vaults } = await supabase
    .from("vaults")
    .select()
    .match({ public: true })
    .limit(20);
  return (
    <div className="animate-in flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text34xl font-semibold text-bold">
          Public Valuts
        </h1>
        <CreateVaultButton />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {vaults?.map((vault) => (
          <VaultCard vault={vault} />
        ))}
      </div>
    </div>
  );
}
