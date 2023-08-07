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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiInfo, FiPlus } from "react-icons/fi";
import { Switch } from "@/components/ui/switch";
import { useSupabase } from "../providers/supabase-provider";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export function CreateVaultButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { supabase } = useSupabase();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleCreateVault = async () => {
    console.log("Creating vault...");
    try {
      // Generate a random short_id of 10 characters using nanoid
      const short_id = nanoid(10);

      // Add a new row to the 'vaults' table with the form data and short_id
      const { data, error } = await supabase.from("vaults").insert([
        {
          name,
          description,
          public: isPublic,
          encrypted: isEncrypted,
          short_id,
        },
      ]);

      if (error) {
        console.error("Error creating vault:", error);
      } else {
        console.log("Vault created successfully:", data);
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating vault:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="text-sm md:text-base">
          <FiPlus className="mr-2" />
          New Vault
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create vault</DialogTitle>
          <DialogDescription>
            Create a new vault for anything you need to store.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4 mb-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                placeholder="My vault"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="(optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 mb-0"
              />
              <div />
              <div className="w-full col-span-3 -mt-1 flex items-start opacity-60 ">
                <FiInfo className="mr-2 " size={24} />
                <span className="text-xs">
                  If left empty AI will generate one as you add entries to your
                  vault.
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="public" className="text-right">
                Public
              </Label>
              <div className="col-span-3 flex justify-end">
                <Switch
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  id="public"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="encrypted" className="text-right">
                Encrypted
              </Label>
              <div className="col-span-3 flex justify-end">
                <Switch
                  id="encrypted"
                  checked={isEncrypted}
                  onChange={() => setIsEncrypted(!isEncrypted)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateVault} type="submit">
              Create
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
