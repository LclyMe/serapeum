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
import { FiInfo, FiLock, FiPlus } from "react-icons/fi";
import { useSupabase } from "../providers/supabase-provider";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";

export function CreateEntryButton({ vaultId }: { vaultId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateEntry = async () => {
    console.log("Creating entry...");
    try {
      // Generate a random short_id of 10 characters using nanoid
      const short_id = nanoid(10);

      // Add a new row to the 'vaults' table with the form data and short_id
      const { data, error } = await supabase.from("entries").insert([
        {
          name,
          description,
          text,
          short_id,
          vault_id: vaultId,
        },
      ]);

      if (error) {
        console.error("Error creating entry:", error);
      } else {
        console.log("Entry added successfully:", data);
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button
          variant="secondary"
          size={"sm"}
          className="text-sm md:text-base"
        >
          <FiLock className="mr-2" />
          Login to add entry
        </Button>
      </Link>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="text-sm md:text-base">
          <FiPlus className="mr-2" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add entry</DialogTitle>
          <DialogDescription>Add a new entry to the vault.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4 mb-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                placeholder="(optional)"
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
              {/* <div className="w-full col-span-3 -mt-1 flex items-start opacity-60 ">
                <FiInfo className="mr-2 " size={16} />
                <span className="text-xs">
                  If left empty AI will generate one for you.
                </span>
              </div> */}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="text" className="text-right">
                Content
              </Label>
              <Textarea
                placeholder="You can paste in markdown, links or even "
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="text" className="text-right">
                Related date
              </Label>
              <DatePicker />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                placeholder="(optional)"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="public" className="text-right">
                Public
              </Label>
              <div className="col-span-3 flex justify-end">
                <Switch
                  checked={isPublic}
                  onCheckedChange={() => setIsPublic(!isPublic)}
                  id="public"
                />
              </div>
            </div> */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="encrypted" className="text-right">
                Encrypted
              </Label>
              <div className="col-span-3 flex justify-end">
                <Switch
                  id="encrypted"
                  checked={isEncrypted}
                  onCheckedChange={() => setIsEncrypted(!isEncrypted)}
                />
              </div>
            </div> */}
          </div>
          <DialogFooter>
            <Button onClick={handleCreateEntry} type="submit">
              Create
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
