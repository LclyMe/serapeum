import { CreateVaultButton } from "@/components/vaults/CreateVaultButton";
import { VaultCard } from "@/components/vaults/VaultCard";
import { getSupabase } from "@/app/session";
import DeleteAccount from "./components/DeleteAccount";
import DeveloperSettings from "./components/DeveloperSettings";

export default async function SettingsPage() {
  const supabase = await getSupabase();
  return (
    <div className="animate-in flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-8 lg:py-14 text-foreground">
      <div className="flex gap-2 justify-between">
        <h1 className="text-2xl md:text34xl font-semibold text-bold">
          Settings
        </h1>
      </div>
      <div className="md:grid md:grid-cols-5 gap-3">
        <div className="col-span-3"></div>
        <div className="col-span-2 md:grid gap-4 mt-3 md:mt-0">
          <DeveloperSettings />
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
