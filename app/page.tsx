import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/app/Header";
import SpinningIcon from "@/components/ui/SpinnerIcon";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  return (
    <div className="w-full flex flex-col items-center max-w-screen overflow-hidden">
      <Header user={user} />

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-5xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <Link href="https://lcly.me/" target="_blank">
              <SpinningIcon />
            </Link>
          </div>
          <h1 className="sr-only">The Open Source Serapeum | a Lcly project</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Enter the <strong>Serapeum</strong>.
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
              Gates will open <strong>soon</strong>...
            </div>
            <Link
              href={"https://github.com/LclyMe/serapeum"}
              target="_blank"
              className="bg-foreground hover:dark:bg-[#ccc] hover:bg-[#222] transition duration-100 py-3 px-3 rounded-lg font-mono text-sm text-background"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white dark:text-slate-900"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          {/* <h2 className="text-lg font-bold text-center">Follow the</h2> */}
          <div className="grid min-w-[740px] grid-cols-3 gap-4">
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
            <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm mt-4 text-background w-[340px] sm:w-[460px] md:w-[540px] md:w-[660px]">
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
