import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FiBookmark, FiChevronRight, FiHeart } from "react-icons/fi";
import Orb from "../ui/Orb";

type Vault = {
  id: string;
  name?: string;
  description?: string;
  short_id?: string;
  pinned?: boolean;
};

export function VaultCard({
  vault,
  compact,
}: {
  vault: any;
  compact?: boolean;
}) {
  return (
    <Link href={"/v/" + (vault.short_id || vault.id)} className="h-full">
      <Card className="flex-grow h-full flex flex-col relative">
        {vault.short_id && (
          <span className="text-xs opacity-10 absolute right-3 top-3">
            v.{vault.short_id}
          </span>
        )}
        <div className={cn("flex flex-grow", { " flex-row": compact })}>
          <CardHeader>
            {!compact && (
              <Orb text={vault.short_id || vault.id} className="h-6 w-6 mb-2" />
            )}
            <CardTitle className="items-center flex flex-row text-2xl">
              {compact && (
                <Orb
                  text={vault.short_id || vault.id}
                  className="h-5 w-5 mr-2"
                />
              )}{" "}
              {vault.name}
            </CardTitle>
            <CardDescription>
              {vault.description || "No description."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center"></div>
            </form>
          </CardContent>
          {compact && (
            <div className="p-6 flex-grow flex md:flex-col md:gap-2 gap-3 justify-end items-end">
              <Button className="" size="sm" variant="outline">
                <FiHeart />
              </Button>
              <Button size="sm" variant="outline">
                <FiBookmark
                  className={cn({
                    "fill-white": vault.pinned,
                  })}
                />
              </Button>
            </div>
          )}
        </div>
        {!compact && (
          <CardFooter className="flex justify-between items-end">
            <div>
              <Button className="mr-2" size="sm" variant="outline">
                <FiHeart />
              </Button>
              <Button size="sm" variant="outline">
                <FiBookmark
                  className={cn({
                    "fill-white": vault.pinned,
                  })}
                />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <FiChevronRight size={14} />
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
