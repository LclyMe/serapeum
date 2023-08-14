"use client";

import { Button } from "@/components/ui/button";
import { useLatestStored } from "@/lib/useLastEntries";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { FiHeart } from "react-icons/fi";

export function VaultLikeButton({ vaultId }: { vaultId: string }) {
  const [isLiked, toggleLike] = useLatestStored("likes", vaultId);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        toggleLike();
      }}
      className={cn("mr-2", {
        "text-red-500 hover:text-red-600": isLiked,
      })}
      size="sm"
      variant="outline"
    >
      <FiHeart
        color="currentColor"
        className="transition ease-in-out duration-200"
        size={16}
        fill={isLiked ? "currentColor" : "transparent"}
      />
    </Button>
  );
}
