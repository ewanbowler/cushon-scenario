import { KeyboardEvent, useCallback } from "react";

interface Props {
  id: string;
  max?: number;
  onValueChange: (value: number) => void;
  value: number;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const BACKSPACE = "Backspace";

export const CurrencyInput: React.FC<Props> = ({
  id,
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  value,
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    throw new Error(`Invalid value property`);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      const { key } = e;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && key !== BACKSPACE)
      ) {
        return;
      }

      const valueString = value.toString();
      let nextValue: number;

      if (key !== BACKSPACE) {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString);
      }

      if (nextValue > max) {
        return;
      }
      onValueChange(nextValue);
    },
    [max, onValueChange, value]
  );

  const valueDisplay = (value / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <input
      id={id}
      className="text-black p-2 rounded-lg"
      inputMode="numeric"
      onKeyDown={handleKeyDown}
      value={valueDisplay}
    />
  );
};
