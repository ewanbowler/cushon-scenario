import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Login } from "../Login/Login";
import logo from "../../assets/logo.svg";
import mobileLogo from "../../assets/logo-mobile.svg";

export const Header: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};

  return (
    <header className="bg-cushonPink text-white shadow-md">
      <div className="flex justify-between items-center py-4 px-8 max-w-8xl mx-auto">
        <a href="/">
          <img
            src={mobileLogo}
            alt="Home"
            className="block sm:hidden h-[57px]"
          />
          <img src={logo} alt="Home" className="hidden sm:block h-[57px]" />
        </a>
        {user && (
          <p>
            {user.firstName} {user.lastName}
          </p>
        )}
        {!user && <Login />}
      </div>
    </header>
  );
};
