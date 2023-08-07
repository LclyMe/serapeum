import { Database } from "@/types/database.types";
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type TypedSupabaseClient = SupabaseClient<Database>;

export const createBrowserClient = () =>
  createClientComponentClient<Database>();
