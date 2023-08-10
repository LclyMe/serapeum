import { FiMoreVertical, FiSettings, FiShare, FiTrash2 } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";

export default function VaultActionMenu({ vault }: { vault: any }) {
  return (
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
        <Link href={`/v/${vault.short_id}/settings`}>
          <DropdownMenuItem>
            <FiSettings className="mr-2" /> Settings
          </DropdownMenuItem>
        </Link>
        {/* <DeleteVaultButton /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteVaultButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className="text-red-600 hover:text-red-800">
          <FiTrash2 className="mr-2" /> Delete vault
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create vault</DialogTitle>
          <DialogDescription>
            Create a new vault for anything you need to store.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4 mb-2"></div>
          <DialogFooter>
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
            <Button type="submit">Delete</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
