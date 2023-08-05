import "./globals.css";

export const metadata = {
  title: "Serapeum",
  description: "The Open Source Serapeum. A Lcly project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-200 dark:bg-white">
          <div vaul-drawer-wrapper="" className="bg-background">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
