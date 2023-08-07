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
  // const { data } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("id", session.user.id)
  //   .single();
  // session.user["profile"] = data;
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
