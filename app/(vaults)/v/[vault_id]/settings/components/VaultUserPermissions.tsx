"use client";

import { useSupabase } from "@/components/providers/supabase-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

function RoleSelector({ value, onChange }: { value: any; onChange: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {value}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder="Select new role..." />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                <p>Viewer</p>
                <p className="text-sm text-muted-foreground">
                  Can view and comment.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                <p>Developer</p>
                <p className="text-sm text-muted-foreground">
                  Can view, comment and edit.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                <p>Billing</p>
                <p className="text-sm text-muted-foreground">
                  Can view, comment and manage billing.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                <p>Owner</p>
                <p className="text-sm text-muted-foreground">
                  Admin-level access to all resources.
                </p>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function UserPermissions({ user, me }: { user: any; me?: boolean }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{user.email}</p>
          {/* <p className="text-xs text-muted-foreground opacity-75">
            {user.email}
          </p> */}
        </div>
      </div>
      {me ? (
        <span className="text-sm opacity-75">You</span>
      ) : (
        <RoleSelector value="Owner" onChange={() => {}} />
      )}
    </div>
  );
}

export function VaultUserPermissions() {
  const { session } = useSupabase();
  const user = session?.user;
  return (
    <Card>
      <CardHeader>
        <CardTitle>User access</CardTitle>
        <CardDescription>
          Users with access to this vault and their permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <UserPermissions
          user={{ avatar: user?.user_metadata?.avatar_url, email: user?.email }}
          me
        />
        {/* <UserPermissions user={{}} /> */}
      </CardContent>
    </Card>
  );
}
