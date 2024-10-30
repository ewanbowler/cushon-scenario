import { useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Fund, Investment } from "../../types";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { UserContext } from "../../contexts/UserContext";

export const InvestmentForm: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};
  const {
    data: funds,
    loading: fundsLoading,
    error: fundsError,
  } = useFetch("funds");

  const [selectedFund, setSelectedFund] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState(0);
  const [investments, setInvestments] = useState<Investment[] | null>(null);

  const {
    data: investmentResponse,
    loading: investmentLoading,
    error: investmentError,
  } = useFetch(investments ? "investments" : null, "POST", investments);

  const handleValueChange = (value: React.SetStateAction<number>) => {
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFund) {
      setErrorMessage("Please select a fund to invest in.");
      return;
    }

    if (value <= 0) {
      setErrorMessage("Please enter an investment amount.");
      return;
    }

    setErrorMessage("");
    setInvestments(
      user
        ? [
            {
              userId: user.id,
              fundId: selectedFund,
              investmentDate: new Date(),
              initialInvestmentValue: value,
            },
          ]
        : null
    );
  };

  const selectedFundData = funds?.data?.find(
    (fund: Fund) => fund.id === selectedFund
  );

  return (
    <div className="max-w-8xl bg-cushonPink m-8 p-8 rounded-xl text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label className="border-b border-white font-bold" htmlFor="fund">
            Fund
          </label>
          {funds && (
            <select
              className="text-black p-2 rounded-lg"
              id="fund"
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
            >
              <option value="" disabled>
                Select a fund
              </option>
              {funds?.data.map((fund: Fund, index: number) => (
                <option key={index} value={fund.id}>
                  {fund.name}
                </option>
              ))}
            </select>
          )}
          {fundsError && (
            <p className="text-black p-2 rounded-lg bg-white">
              A problem occurred while fetching funds
            </p>
          )}
          {fundsLoading && (
            <p className="text-black p-2 rounded-lg bg-white">
              Loading funds...
            </p>
          )}
        </div>
        {selectedFundData && (
          <p className="mt-3 text-white">{selectedFundData.description}</p>
        )}
        <div className="flex flex-col gap-3 mt-6">
          <label
            htmlFor="currency-input"
            className="border-b border-white font-bold"
          >
            Investment value
          </label>
          <CurrencyInput
            id="currency-input"
            onValueChange={handleValueChange}
            value={value}
            max={100000000}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 bg-white rounded-lg font-bold p-3 my-3">
            ⚠ {errorMessage}
          </p>
        )}
        {!investments && (
          <button
            className="rounded-full bg-white text-black font-bold px-4 py-3 mt-6 hover:bg-gray-100"
            type="submit"
          >
            Invest
          </button>
        )}
      </form>
      {investmentLoading && <p className="mt-3">Processing investment</p>}
      {investmentResponse && <p className="mt-3">Investment processed.</p>}
      {investmentError && (
        <p className="mt-3">
          An error occurred while processing your investment.
        </p>
      )}
    </div>
  );
};
