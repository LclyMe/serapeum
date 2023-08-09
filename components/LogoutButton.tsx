import { FiLogOut } from "react-icons/fi";
import { Button } from "./ui/button";

export function LogoutButtonIcon() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button variant="ghost" size="icon" type="submit">
        <FiLogOut size={17} />
      </Button>
    </form>
  );
}

export function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post" className="w-full max-w-sm">
      <button
        type="submit"
        className="w-full dark:text-foreground/80 bg-btn-background px-8 py-3 flex items-center justify-center rounded-lg hover:bg-btn-background-hove"
      >
        <FiLogOut size={20} className="mr-2" />
        <span className="">Log out</span>
      </button>
    </form>
  );
}
