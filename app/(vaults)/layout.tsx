import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Header } from "../Header";

export default async function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col flex-grow md:min-h-screen">
      <Header user={user} />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}