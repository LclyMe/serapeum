"use client";

import { Drawer } from "vaul";
import { ProfileDrawer } from "../components/profile/ProfileDraw";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";
import { AuthUser } from "@supabase/supabase-js";
import { useState } from "react";

export function Header({ user }: { user?: AuthUser | null }) {
  const [profileDrawOpen, setProfileDrawOpen] = useState(false);
  return (
    <header className="w-full">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div className="font-semibold text-lg">Serapeum</div>
          <div>
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
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
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
