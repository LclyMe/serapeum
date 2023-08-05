import Link from "next/link";
import Messages from "./messages";
import Image from "next/image";
import { FiAlertTriangle } from "react-icons/fi";

const enableEmailAuth = process.env.NEXT_PUBLIC_ENABLE_EMAIL_AUTH === "true";

export default function Login() {
  return (
    <div className="md:max-h-screen min-h-screen max-md:items-center flex flex-col-reverse md:flex-row w-full px-8 justify-center md:space-between gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="w-1/2 flex items-center justify-center">
        <form
          className="flex flex-col justify-center min-w-[360px] gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          {enableEmailAuth && (
            <>
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button className="bg-black dark:bg-white flex items-center justify-center rounded-md px-4 py-2 text-white dark:text-black mb-2">
                Sign in
              </button>
              <button
                formAction="/auth/sign-up"
                className="border border-black border-opacity-40 dark:border-opacity-20 dark:border-white rounded-md px-4 py-2 dark:text-white mb-2"
              >
                Sign up
              </button>
            </>
          )}
          <button
            formAction="/auth/github"
            className="bg-black dark:bg-white flex items-center justify-center rounded-md px-4 py-3 hover:bg-[#222] hover:dark:bg-[#ccc] transition duration-100 text-white dark:text-black mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white dark:text-slate-900 mr-3"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>{" "}
            Authenticate with GitHub
          </button>
          <button
            formAction="/auth/x"
            className="border border-black hover:bg-[#eee] hover:dark:bg-[#222] transition duration-100 border-opacity-40 dark:border-opacity-20 dark:border-white rounded-md px-4 py-2 dark:text-white"
          >
            <span className="text-lg mr-1">𝕏</span> Authenticate with Twitter
          </button>
          <p className="opacity-60 text-center">
            <FiAlertTriangle size={14} className="inline mr-1 " />
            <small>X auth may not work correctly on mobile.</small>
          </p>
          <Messages />
        </form>
      </div>
      <div className="w-1/2 flex justify-center p-8">
        <Image
          src={"/images/0_0.png"}
          alt="Under observation"
          objectFit="cover"
          width={600}
          height={800}
          className="rounded-xl h-full min-w-[200px] mb-6 md:mb-0"
        />
      </div>
    </div>
  );
}
