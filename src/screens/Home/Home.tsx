import { useState, useEffect, FC, ReactElement } from "react";
import { useFetch } from "../../assets/utils/fetch";
import { HistoricalData, ExchangeRate } from "../../interfaces";

import InputCard from "../../components/InputCard";
import ResultCard from "../../components/ResultCard";
import RecentlyAddedCard from "../../components/RecentlyAddedCard";
import HistoryCard from "../../components/HistoryCard";

import styles from "./Home.module.sass";

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

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>();
  const [inputValue, setInputValue] = useState<number | undefined>();
  const [convertedValue, setConvertedValue] = useState<number | undefined>();
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [currenciesFrom, setCurrenciesFrom] = useState(defaultCurrencies);
  const [currenciesTo, setCurrenciesTo] = useState(defaultCurrencies);

  const selectedCurrecyFrom = currenciesFrom.find(
    ({ selected }) => selected === true
  )!.name;
  const selectedCurrecyTo = currenciesTo.find(
    ({ selected }) => selected === true
  )!.name;

  /**
   * Processing data and filling up the Dropdowns and ExchangeRates
   */
  useEffect(() => {
    if (data !== null) {
      const modifiedData = handleDataTransformation(data);

      const dataArray = Object.keys(modifiedData).map((key, index) => {
        const selected = index === 0 ? true : false;
        return { name: key, selected };
      });

      setCurrenciesTo(dataArray);
    }
  }, [data]);

  useEffect(() => {
    if (data !== null) {
      const modifiedData = handleDataTransformation(data);

      const dataArray = Object.keys(modifiedData).map((key, index) => {
        const selected = index === 0 ? true : false;
        return { name: key, selected };
      });

      setCurrenciesFrom(dataArray);
      setExchangeRates(modifiedData);
    }
  }, [data]);

  /**
   * Custom handlers:
   */
  const handleDataTransformation = (data: ExchangeRate[]) => {
    const mostRelevantData = data[0];
    delete mostRelevantData.Date;
    for (const element in mostRelevantData) {
      if (
        mostRelevantData[element] === "N/A" ||
        mostRelevantData[element] === ""
      ) {
        delete mostRelevantData[element];
      }
    }

    return mostRelevantData;
  };

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
    const exchangeRateFrom = exchangeRates![from];
    const exchangeRateTo = exchangeRates![to];

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
    const updatedCurrenciesFrom = [...currenciesFrom];
    const updatedCurrenciesTo = [...currenciesTo];

    for (const element of updatedCurrenciesFrom) {
      element.selected = false;
    }
    for (const element of updatedCurrenciesTo) {
      element.selected = false;
    }

    const indexFrom = updatedCurrenciesFrom.findIndex(
      ({ name }) => name === historicalData.selectedCurrecyFrom
    );
    const indexTo = updatedCurrenciesFrom.findIndex(
      ({ name }) => name === historicalData.selectedCurrecyTo
    );

    updatedCurrenciesFrom[indexFrom].selected = true;
    updatedCurrenciesTo[indexTo].selected = true;
    setCurrenciesFrom(updatedCurrenciesFrom);
    setCurrenciesTo(updatedCurrenciesTo);

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
