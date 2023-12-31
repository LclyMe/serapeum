import { getSupabase } from "@/app/session";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { VaultSecuritySettings } from "./components/VaultSecuritySettings";
import DeleteVault from "./components/DeleteVault";
import { VaultUserPermissions } from "./components/VaultUserPermissions";
import { VaultStats } from "./components/VaultStats";
import { VaultMetadata } from "./components/VaultMetadata";

interface VaultPageProps {
  params: { vault_id: string };
}

export default async function ValutSettingsPage({ params }: VaultPageProps) {
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
    <div className="animate-in">
      <div className="mb-3">
        <Link
          className="flex items-center opacity-70"
          href={"/v/" + vault.short_id}
        >
          <FiArrowLeft className="mr-1" /> Back
        </Link>
      </div>
      {/* <div className="w-full my-5 p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" /> */}
      <div className="md:grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-3">
          {!vault.public && <VaultUserPermissions />}
          <VaultMetadata vault={vault} />
        </div>
        <div className="col-span-2 md:grid gap-4 mt-3 md:mt-0">
          <VaultSecuritySettings vault={vault} />
          <DeleteVault vault={vault} />
        </div>
      </div>
    </div>
  );
}
