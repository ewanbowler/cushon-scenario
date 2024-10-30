import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Login } from "../Login/Login";
import Logo from "../../assets/logo.svg";

export const Header: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};

  return (
    <header className="bg-cushonPink text-white shadow-md">
      <div className="flex justify-between items-center py-4 px-8 max-w-8xl mx-auto">
        <a href="/">
          <img src={Logo} alt="Home" />
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
