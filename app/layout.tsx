import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { getSession } from "@/app/session";
import { Header } from "./Header";

export const metadata = {
  title: "The Serapeum",
  description:
    "Open source storage, collaboration, and AI tools designed for human data. A Lcly project.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="flex min-h-screen" suppressHydrationWarning>
        <SupabaseProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="bg-gray-200 dark:bg-white flex flex-grow">
              <div
                vaul-drawer-wrapper=""
                className="bg-background w-full flex flex-col flex-grow"
              >
                <Header user={session?.user} />
                <div className="flex flex-col items-center flex-grow">
                  {children}
                </div>
              </div>
            </main>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
