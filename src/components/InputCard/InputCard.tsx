import { FC, ReactElement } from "react";

import Dropdown from "../Dropdown";
import Input from "../Input/Input";

import styles from "./InputCard.module.sass";

type InputCardProps = {
  inputValue: number | undefined;
  currenciesFrom: { name: string; selected: boolean }[];
  currenciesTo: { name: string; selected: boolean }[];
  onCurrencySelectionFrom: (currency: string) => void;
  onCurrencySelectionTo: (currency: string) => void;
  onInputChange: (value: number) => void;
  onConvertCurrency: (amount: number, from: string, to: string) => void;
};

const InputCard: FC<InputCardProps> = ({
  inputValue,
  currenciesFrom,
  currenciesTo,
  onCurrencySelectionFrom,
  onCurrencySelectionTo,
  onInputChange,
  onConvertCurrency,
}): ReactElement => {
  const selectedCurrecyFrom = currenciesFrom.find(
    ({ selected }) => selected === true
  )!.name;
  const selectedCurrecyTo = currenciesTo.find(
    ({ selected }) => selected === true
  )!.name;

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        {/* Fill */}
        <div />
        {/* Glow */}
        <div />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.description}>
          <p data-cy="header">Currency Converter 💰</p>
          <p>
            A currency converter is a helpful tool that allows you to quickly
            and easily convert one currency to another. <br /> With a two
            dropdown menu currency converter, you can select the currencies you
            want to convert from and to, making it simple to get an accurate
            conversion. <br />
            <br />
            To use the currency converter, all you need to do is enter the
            amount you want to convert in the input field. The converter will
            then show you the converted amount in the currency you selected.
          </p>
        </div>

        <div className={styles.inputBox}>
          <p>Amount:</p>
          <Input
            value={inputValue!}
            name="amount"
            type="number"
            category={"amount"}
            placeholder="eg. 250 000"
            onChange={onInputChange}
          />
        </div>

        <div className={styles.currencyBox}>
          <div>
            <p>Convert From:</p>
            <Dropdown
              data-cy="convertFrom"
              currencies={currenciesFrom}
              onCurrencySelection={onCurrencySelectionFrom}
            />
          </div>
          <div>
            <p>Convert To:</p>
            <Dropdown
              data-cy="convertTo"
              currencies={currenciesTo}
              onCurrencySelection={onCurrencySelectionTo}
            />
          </div>
          <button
            data-cy="convertButton"
            className={styles.button}
            onClick={() =>
              onConvertCurrency(
                Number(inputValue),
                selectedCurrecyFrom,
                selectedCurrecyTo
              )
            }
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
