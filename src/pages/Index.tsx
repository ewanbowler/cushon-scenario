import { useContext } from "react";
import { InvestmentForm } from "../components/InvestmentForm/InvestmentForm";
import { UserContext } from "../contexts/UserContext";
import { Investments } from "../components/Investments/Investments";

export const Index: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};

  return user ? (
    <div className="flex flex-col">
      <InvestmentForm />
      <Investments />
    </div>
  ) : (
    <p className="max-w-8xl bg-cushonPink m-8 p-8 rounded-xl text-white">
      Please login to view and to make investments
    </p>
  );
};
