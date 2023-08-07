import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { getSession } from "@/lib/session";

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
      <body>
        <SupabaseProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="bg-gray-200 dark:bg-white">
              <div vaul-drawer-wrapper="" className="bg-background">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
