import Link from "next/link";
import Image from "next/image";
import { getSupabase } from "./session";
import { VaultCard } from "@/components/vaults/VaultCard";
import { FiArrowRight, FiBox } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = await getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: vaults, error } = await supabase
    .from("vaults")
    .select("*")
    .match({ public: true })
    .order("likes", { ascending: false })
    .limit(6);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col items-center flex-grow">
        <div className="animate-in flex w-full flex-col gap-14 opacity-0 max-w-5xl px-3 py-12 lg:py-16 text-foreground">
          <div className="flex flex-col items-center mb-4 lg:mb-12">
            <div className="flex justify-center items-end opacity-90">
              <Link
                href="https://lcly.me/"
                target="_blank"
                className="text-5xl"
              >
                𝕊
              </Link>
              <span className="text-2xl opacity-90">erapeum</span>
            </div>
            <h1 className="sr-only">
              The Open Source Serapeum | a Lcly project
            </h1>
            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-12 mb-5">
              Modern Data <strong>Archives</strong>
            </p>
            <p className="mb-12 text-xl opacity-60 text-center">
              Open source storage, collaboration, and AI tools designed
              <br className="hidden md:block" /> for human data.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={user ? "/vaults" : "/login"}
                className="bg-foreground hover:dark:bg-[#ccc] cursor-pointer hover:bg-[#202020] transition duration-100 flex items-center py-3 px-6 rounded-lg font-mono text-sm text-background"
              >
                <FiBox className="mr-2" size={18} /> Create a vault
              </Link>
              <Link
                href={"https://github.com/LclyMe/serapeum"}
                target="_blank"
                className="bg-foreground hover:dark:bg-[#ccc] hover:bg-[#202020] transition duration-100 py-3 px-3 rounded-lg font-mono text-sm text-background"
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

          {vaults?.length! > 0 && (
            <div>
              <h2 className="text-2xl mb-6 text-center">Top public vaults</h2>
              <div className="flex flex-col gap-8 text-foreground">
                {/* <h2 className="text-lg font-bold text-center">Follow the</h2> */}
                <div className="grid md:grid-cols-3 gap-4">
                  {vaults?.slice(0, 3)?.map((vault) => (
                    <VaultCard key={vault.id} vault={vault} />
                  ))}
                </div>
                <div className="md:grid md:grid-cols-6 gap-4 hidden">
                  <div className="grid-col-1" />
                  {vaults?.slice(3, 5)?.map((vault) => (
                    <VaultCard
                      className="col-span-2"
                      key={vault.id}
                      vault={vault}
                    />
                  ))}
                  <div className="grid-col-1" />
                </div>
              </div>
            </div>
          )}

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-6">Developer API</h2>
            <div className="mb-10">
              <p className="text-center text-lg opacity-60">
                You can use the Serapeum API to build your own apps or workflows
                <br />
                to store and search data in your vaults.
              </p>
              <a
                href="https://github.com/LclyMe/serapeum#deploy-your-own"
                target="_blank"
                className="mt-3 text-lg text-blue-400 hover:text-blue-500 transition block flex items-center justify-center gap-2"
              >
                Read the documentation <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-6">Self host</h2>
            <div className="mb-10">
              <p className="text-center text-lg opacity-60">
                Serapeum is fully open source and can be self-hosted for maximum
                <br /> control over your data.
              </p>
              <a
                href="https://github.com/LclyMe/serapeum#deploy-your-own"
                target="_blank"
                className="mt-3 text-lg text-blue-400 hover:text-blue-500 transition block flex items-center justify-center gap-2"
              >
                Learn how <FiArrowRight />
              </a>
            </div>
            <div className="flex gap-5">
              <Image
                src={"/images/nextjs.svg"}
                alt="Next.js"
                height={60}
                width={60}
                className="p-3 bg-white shadow-lg rounded-xl"
              />
              <Image
                src={"/images/supabase.png"}
                alt="Supabase"
                height={60}
                width={60}
                className="p-3 bg-gray-800 shadow rounded-xl"
              />
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
                View the{" "}
                <Link
                  href="https://app.usefathom.com/share/skfnzhbe/serapeum"
                  target="_blank"
                  className="text-md font-semibold"
                >
                  analytics
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
