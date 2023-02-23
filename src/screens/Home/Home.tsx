import { useState, useEffect, FC, ReactElement } from "react";
import { useFetch } from "../../assets/utils/fetch";

import InputCard from "../../components/InputCard";
import ResultCard from "../../components/ResultCard";
import RecentlyAddedCard from "../../components/RecentlyAddedCard";
import HistoryCard from "../../components/HistoryCard";

import styles from "./Home.module.sass";

type HistoricalData = {
  inputValue: number | undefined;
  convertedValue: number;
  selectedCurrecyFrom: string;
  selectedCurrecyTo: string;
};

type exchangeRate = {
  [key: string]: number | string;
};

const Home: FC = (): ReactElement => {
  const { data, isLoading, error } = useFetch(
    "https://corsproxy.io/?https://www.jsonkeeper.com/b/561I"
  );
  const defaultCurrencies = [
    {
      name: "NOK",
      selected: true,
    },
    {
      name: "GBP",
      selected: false,
    },
    {
      name: "PLN",
      selected: false,
    },
  ];

  const [inputValue, setInputValue] = useState<number | undefined>();
  const [convertedValue, setConvertedValue] = useState<number | undefined>();
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [currenciesFrom, setCurrenciesFrom] = useState(defaultCurrencies);
  const [currenciesTo, setCurrenciesTo] = useState(defaultCurrencies);
  const [exchangeRates, setExchangeRates] = useState<exchangeRate[]>();

  const selectedCurrecyFrom = currenciesFrom.find(
    ({ selected }) => selected === true
  )!.name;
  const selectedCurrecyTo = currenciesTo.find(
    ({ selected }) => selected === true
  )!.name;

  /**
   *
   */
  useEffect(() => {
    if (data !== null) {
      const mostRelevantData = data[0];
      console.log(mostRelevantData);

      //@ts-ignore
      delete mostRelevantData.Date;
      //@ts-ignore
      for (const element in mostRelevantData) {
        if (
          mostRelevantData[element] === "N/A" ||
          mostRelevantData[element] === ""
        ) {
          delete mostRelevantData[element];
        }
      }

      const dataArray = Object.keys(mostRelevantData).map((key, index) => {
        const selected = index === 0 ? true : false;
        return { name: key, selected };
      });

      // console.log(dataArray);

      // setCurrenciesFrom(dataArray);
      setCurrenciesTo(dataArray);
      setExchangeRates(mostRelevantData);
      console.log("trigger");
    }
  }, [data]);

  /**
   * Custom handlers:
   */
  const handleCurrencySelectionFrom = (currency: string) => {
    const updatedCurrencies = [...currenciesFrom];

    for (const element of updatedCurrencies) {
      element.selected = false;
    }

    const index = updatedCurrencies.findIndex(({ name }) => name === currency);
    updatedCurrencies[index].selected = true;

    setCurrenciesFrom(updatedCurrencies);
  };

  const handleCurrencySelectionTo = (currency: string) => {
    const updatedCurrencies = [...currenciesTo];

    for (const element of updatedCurrencies) {
      element.selected = false;
    }

    const index = updatedCurrencies.findIndex(({ name }) => name === currency);
    updatedCurrencies[index].selected = true;

    setCurrenciesTo(updatedCurrencies);
  };

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleConvertCurrency = (amount: number, from: string, to: string) => {
    //@ts-ignore
    const exchangeRateFrom = exchangeRates[from];
    //@ts-ignore
    const exchangeRateTo = exchangeRates[to];

    if (!exchangeRateFrom || !exchangeRateTo) {
      throw new Error("Invalid currency code");
    }

    const convertedValue =
      (amount * Number(exchangeRateTo)) / Number(exchangeRateFrom);
    setConvertedValue(convertedValue);

    const historyPackage = {
      inputValue,
      convertedValue,
      selectedCurrecyFrom,
      selectedCurrecyTo,
    };
    const updatedHistoricalData = [...historicalData];
    updatedHistoricalData.push(historyPackage);
    setHistoricalData(updatedHistoricalData);
  };

  const handleConvertionRecovery = (historicalData: HistoricalData) => {
    setInputValue(historicalData.inputValue);
    setConvertedValue(historicalData.convertedValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <InputCard
          inputValue={inputValue}
          currenciesFrom={currenciesFrom}
          currenciesTo={currenciesTo}
          onCurrencySelectionFrom={handleCurrencySelectionFrom}
          onCurrencySelectionTo={handleCurrencySelectionTo}
          onInputChange={handleInputChange}
          onConvertCurrency={handleConvertCurrency}
        />
      </div>

      <div className={styles.rightContainer}>
        <ResultCard
          convertedValue={convertedValue}
          selectedCurrecyTo={selectedCurrecyTo}
        />

        <div className={styles.detailsContainer}>
          <RecentlyAddedCard
            historicalData={historicalData}
            onConvertionRecovery={handleConvertionRecovery}
          />
          <HistoryCard historicalData={historicalData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
