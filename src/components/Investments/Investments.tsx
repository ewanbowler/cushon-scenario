import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../contexts/UserContext";
import { Investment } from "../../types";

export const Investments: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};
  const formatCurrency = (value: number) => {
    return (value / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };
  const {
    data: investments,
    loading: investmentsLoading,
    error: investmentsError,
  } = useFetch(user ? `investments/user/${user.id}` : null);

  return (
    <div className="max-w-8xl bg-cushonPink m-8 p-8 rounded-xl text-white">
      {investmentsLoading && <p>Investments loading...</p>}
      {investmentsError && (
        <p>An error occurred while getting your investments.</p>
      )}
      {investments && (
        <div className="flex flex-col gap-4">
          {investments?.data.map((investment: Investment, index: number) => (
            <div key={index}>
              <p className="font-bold">{investment.fundName}</p>
              <p>
                {`Initial investment: ${formatCurrency(
                  investment.initialInvestmentValue
                )}`}
              </p>
              {investment.currentInvestmentValue && (
                <p>
                  {`Current value: ${formatCurrency(
                    investment.currentInvestmentValue
                  )}`}
                </p>
              )}
              <p>
                {investment.currentInvestmentValue &&
                  `Total percentage growth: ${
                    investment.initialInvestmentValue > 0
                      ? (
                          ((investment.currentInvestmentValue -
                            investment.initialInvestmentValue) /
                            investment.initialInvestmentValue) *
                          100
                        ).toFixed(2)
                      : 0
                  }%`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
