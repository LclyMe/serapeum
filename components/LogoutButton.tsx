import { FiLogOut } from "react-icons/fi";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button variant="ghost" type="submit">
        <FiLogOut size={17} />
      </Button>
    </form>
  );
}
