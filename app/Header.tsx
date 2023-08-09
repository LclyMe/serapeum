"use client";

import { Drawer } from "vaul";
import { ProfileDrawer } from "../components/profile/ProfileDraw";
import { LogoutButtonIcon } from "../components/LogoutButton";
import Link from "next/link";
import { AuthUser } from "@supabase/supabase-js";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ user }: { user?: AuthUser | null }) {
  const [profileDrawOpen, setProfileDrawOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 text-sm text-foreground">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="font-semibold text-lg">Serapeum</div>
            </Link>
            <Link href="/public" className="text-md hover:underline">
              Public{" "}
              <span
                className={cn({
                  "hidden md:inline": user,
                })}
              >
                Vaults
              </span>
            </Link>
            {user && (
              <Link
                href="/vaults"
                className={cn("text-md hover:underline hidden md:block")}
              >
                Vaults
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProfileDrawOpen(true)}
                  className="rounded-md no-underline overflow-hidden flex items-center bg-btn-background hover:bg-btn-background-hover"
                >
                  <img
                    src={user.user_metadata?.avatar_url}
                    className="h-9 w-9 mr-2"
                    alt={`${user.user_metadata?.preferred_username}'s avatar`}
                  />
                  <span className="text-gray-700 dark:text-foreground/80 text-sm pr-4">
                    @{user.user_metadata?.preferred_username}
                  </span>
                </button>
                <div className="hidden md:block">
                  <LogoutButtonIcon />
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <ProfileDrawer
        user={user}
        open={profileDrawOpen}
        toggle={setProfileDrawOpen}
      />
    </header>
  );
}
