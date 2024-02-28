import React from "react";
import { logout } from "../../../actions/logout";

export const LogoutButton = () => {
  return (
    <div className="w-full">
      <form action={logout}>
        <button className="w-full text-[red]" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
};
