import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "../components/LogoutButton";
import LclyLogo from "../components/LclyLogo";

export const dynamic = "force-dynamic";

const resources = [
  {
    title: "Mystery 1",
    subtitle: "TODO",
    url: null,
    image: "/images/ilu2.png",
  },
  {
    title: "Mystery 2",
    subtitle: "TODO",
    url: null,
    image: "/images/ilu1.png",
  },
  {
    title: "Mystery 3",
    subtitle: "TODO",
    url: null,
    image: "/images/ilu3.png",
  },
];

const examples = [
  { type: "Client Components", src: "app/_examples/client-component/page.tsx" },
  { type: "Server Components", src: "app/_examples/server-component/page.tsx" },
  { type: "Server Actions", src: "app/_examples/server-action/page.tsx" },
  { type: "Route Handlers", src: "app/_examples/route-handler.ts" },
];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div className="font-semibold text-lg">Serapeum</div>
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <Link href="https://lcly.me/" target="_blank">
              <LclyLogo className="text-black dark:text-white h-20 w-20" />
            </Link>
          </div>
          <h1 className="sr-only">The Open Source Serapeum | a Lcly project</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Enter the <strong>Serapeum</strong>.
          </p>
          <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
            Get started by editing <strong>app/page.tsx</strong>
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          {/* <h2 className="text-lg font-bold text-center">Follow the</h2> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {resources.map(({ title, image }) => (
              <Image
                src={image}
                alt={title}
                height={370}
                width={370}
                className="relative flex flex-col group rounded-lg border hover:border-foreground transition duration-200 w-full h-full"
              />
            ))}
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <div className="grid gap-2 justify-center mx-auto text-center">
            <h2 className="text-lg font-bold text-center">The legend</h2>
            <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm mt-4 text-background">
              <p className="text-md text-center text-white dark:text-black py-4">
                In a remote and desolate desert lies the undiscovered Serapeum,
                a fabled temple veiled in mystery.{" "}
                <span className="block mt-2">
                  Whispers tell of a hidden entrance, protected by illusions and
                  riddles, known only to the chosen few.
                </span>{" "}
                <span className="block mt-2">
                  Legend speaks of ancient knowledge and cosmic powers concealed
                  within its cryptic walls.
                </span>{" "}
                <span className="block mt-2">
                  Tales of half-human, half-sand guardians add to the allure,
                  while shimmering celestial lights dance above, revealing
                  hidden prophecies.
                </span>{" "}
                <span className="block mt-2">
                  Yet, its exact location remains elusive, a mystery that
                  continues to beckon the hearts of those who seek the enigmatic
                  truths that lie beyond the shifting sands.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <Link
              href="https://supabase.com/"
              target="_blank"
              className="font-bold mr-2"
            >
              Supabase
            </Link>
            /{" "}
            <span className="ml-1">
              Follow on{" "}
              <Link
                href="https://x.com/d11erh"
                target="_blank"
                className="text-md"
              >
                𝕏
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
