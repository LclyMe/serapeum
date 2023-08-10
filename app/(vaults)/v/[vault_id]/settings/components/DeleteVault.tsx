import { FiTrash2 } from "react-icons/fi";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
        <DeleteVaultButton />
      </CardFooter>
    </Card>
  );
}

export function DeleteVaultButton() {
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
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
