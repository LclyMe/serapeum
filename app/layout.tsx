import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { getSession } from "@/app/session";

export const metadata = {
  title: "Serapeum",
  description: "The Open Source Serapeum. A Lcly project.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <SupabaseProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="bg-gray-200 dark:bg-white flex flex-grow">
              <div
                vaul-drawer-wrapper=""
                className="bg-background w-full flex flex-grow"
              >
                {children}
              </div>
            </main>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
