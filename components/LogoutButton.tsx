import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="h-9 px-3 text-sm rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        <FiLogOut size={17} />
      </button>
    </form>
  );
}
