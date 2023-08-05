"use client";

import { AuthUser } from "@supabase/supabase-js";
import Image from "next/image";
import { Drawer } from "vaul";
import { FiTrash2 } from "react-icons/fi";

export function ProfileDrawer({
  open,
  toggle,
  user,
}: {
  open: boolean;
  toggle: (open: boolean) => void;
  user?: AuthUser | null;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={toggle} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Content
          className="z-10 bg-background flex dark:text-white border dark:border-white dark:border-opacity-10 flex-col rounded-t-[10px] h-[70%] mt-24 fixed bottom-0 left-0 right-0 focus-visible:border-gray-700 focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100
            transition-colors outline-none "
        >
          <div className="p-4 mb-5 bg-background rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-1100 mb-8" />

            <div className="mx-auto prose prose-invert">
              {user?.user_metadata?.avatar_url && (
                <img
                  src={user?.user_metadata?.avatar_url}
                  className="rounded-full mx-auto mb-4"
                  height={120}
                  width={120}
                  alt={`${user?.user_metadata?.preferred_username}'s avatar`}
                />
              )}
              <Drawer.Title className="font-medium mb-14 text-gray-700 dark:text-foreground/90 text-lg text-center">
                @{user?.user_metadata?.preferred_username}
              </Drawer.Title>
              <div className="px-6 flex justify-center">
                {/* <div className="grid grid-cols-3 gap-2"> */}
                {/* <div className="dark:text-foreground/80 bg-btn-background px-4 py-6 flex flex-col items-center justify-center rounded-lg hover:bg-btn-background-hove">
                  <FiTrash2 size={22} className="mb-2" />
                  <span className="text-sm">Delete account</span>
                </div>
                <div className="dark:text-foreground/80 bg-btn-background px-4 py-6 flex flex-col items-center justify-center rounded-lg hover:bg-btn-background-hove">
                  <FiTrash2 size={22} className="mb-2" />
                  <span className="text-sm">Delete account</span>
                </div> */}
                <div className="dark:text-foreground/80 bg-btn-background px-8 py-3 flex items-center justify-center rounded-lg hover:bg-btn-background-hove">
                  <FiTrash2 size={20} className="mr-2" />
                  <span className="">Delete account</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
