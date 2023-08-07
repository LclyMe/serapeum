import { createServerClient } from "./supabase-server";

export async function getSupabase() {
  return createServerClient();
}

export async function getSession() {
  const supabase = await getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
