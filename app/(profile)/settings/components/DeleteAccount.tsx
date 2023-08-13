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
import { useCallback } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";

export default function DeleteAccount() {
  return (
    <Card className="mt-3 md:mt-0">
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>
          Delete your account and all it's contents, settings and logs.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <DeleteAccountButton />
      </CardFooter>
    </Card>
  );
}

export function DeleteAccountButton() {
  // const router = useRouter();
  const { supabase } = useSupabase();
  const deleteAccount = useCallback(async () => {
    // await supabase.from("vaults").delete().eq("id", vault.id);
    // // revalidatePath("/vaults");
    // router.refresh();
    // router.push("/vaults");
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will delete all private data associated with this account. This
            action cannot be reversed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4 mb-2"></div>
          <DialogFooter className="flex md:justify-between">
            <Button variant="secondary">Cancel</Button>
            <form action="/auth/sign-out" method="post">
              <Button
                onClick={deleteAccount}
                variant="destructive"
                type="submit"
              >
                Delete account
              </Button>
            </form>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
