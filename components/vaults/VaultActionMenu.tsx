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
import { getSession } from "@/app/session";

export default async function VaultActionMenu({ vault }: { vault: any }) {
  const session = await getSession();
  const isCreator = session?.user?.id === vault.created_by;
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
        <DropdownMenuItem className="cursor-pointer">
          <FiShare className="mr-2" /> Share
        </DropdownMenuItem>
        {isCreator && (
          <Link href={`/v/${vault.short_id}/settings`}>
            <DropdownMenuItem>
              <FiSettings className="mr-2" /> Settings
            </DropdownMenuItem>
          </Link>
        )}
        {/* <DeleteVaultButton /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
