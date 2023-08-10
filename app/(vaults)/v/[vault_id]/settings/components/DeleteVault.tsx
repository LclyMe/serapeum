"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useCallback } from "react";

export default function DeleteVault({ vault }: { vault: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete vault</CardTitle>
        <CardDescription>
          Delete this vault and all it's contents, settings and logs.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <DeleteVaultButton vault={vault} />
      </CardFooter>
    </Card>
  );
}

export function DeleteVaultButton({ vault }: { vault: any }) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const deleteVault = useCallback(async () => {
    await supabase.from("vaults").delete().eq("id", vault.id);
    // revalidatePath("/vaults");
    router.refresh();
    router.push("/vaults");
  }, [vault, router, supabase]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete vault
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sure you want to delete?</DialogTitle>
          <DialogDescription>
            This will delete all data and settings for this vault. This action
            cannot be reversed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4 mb-2"></div>
          <DialogFooter className="flex md:justify-between">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={deleteVault} variant="destructive" type="submit">
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
