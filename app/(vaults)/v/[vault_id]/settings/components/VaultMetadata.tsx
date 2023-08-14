import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function VaultMetadata({ vault }: { vault: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
        <CardDescription>
          Set a name and description for your vault.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            placeholder="My vault"
            id="name"
            value={vault.name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right mt-2">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="(optional)"
            value={vault.description}
            className="col-span-3 mb-0"
          />
          {/* <div className="w-full col-span-3 -mt-1 flex items-start opacity-60 ">
                <FiInfo className="mr-2 " size={24} />
                <span className="text-xs">
                  If left empty AI will generate one as you add entries to your
                  vault.
                </span>
              </div> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled type="submit">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
