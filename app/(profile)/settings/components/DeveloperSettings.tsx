import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { cookies } from "next/headers";
import {
  FiClipboard,
  FiPlus,
  FiRefreshCcw,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import crypto from "crypto";
import { getSession, getSupabase } from "@/app/session";
import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import ApiKey from "./ApiKey";

export default async function DeveloperSettings() {
  const supabase = await getSupabase();
  const session = await getSession();
  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", session?.user.id);
  const generate = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const apiKey = crypto.randomBytes(32).toString("hex");
    const { data, error } = await supabase
      .from("api_keys")
      .insert({ key: apiKey, user_id: session?.user.id });
    if (error) {
      console.log(error);
    }
    revalidatePath("/settings");
  };
  const deleteKey = async (key_id: string) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", key_id);
    if (error) {
      console.log(error);
    }
    revalidatePath("/settings");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer settings</CardTitle>
        <CardDescription>
          Enable advanced features for developers, manage access tokens, and
          more.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <div className="flex justify-between items-center">
          <h4 className="">Access keys</h4>
          <form action={generate}>
            <Button type="submit" variant="ghost" size="icon">
              <FiPlus />
            </Button>
          </form>
        </div>
        <div className="grid gap-1">
          {data?.map((key) => (
            <ApiKey key={key.id} apiKey={key} />
          ))}
        </div>
        {data?.length === 0 && (
          <p className="mb-0 text-sm text-neutral-500 dark:text-neutral-400">
            No access keys.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
