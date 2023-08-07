import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/database.types";

export const createServerClient = () =>
  createServerComponentClient<Database>({
    cookies,
  });