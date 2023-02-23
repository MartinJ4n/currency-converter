import { FC, ReactElement } from "react";
import { HistoricalData } from "../../interfaces";

import styles from "./HistoryCard.module.sass";

type HistoryCardProps = {
  historicalData: HistoricalData[];
};

const HistoryCard: FC<HistoryCardProps> = ({
  historicalData,
}): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        {/* Fill */}
        <div />
        {/* Glow */}
        <div />
      </div>

      <div className={styles.mainContainer}>
        <h1 className={styles.header}>History:</h1>

        {historicalData.length !== 0 ? (
          historicalData.map(
            (
              {
                inputValue,
                convertedValue,
                selectedCurrecyFrom,
                selectedCurrecyTo,
              },
              index
            ) => (
              <div className={styles.detailsBox} key={index}>
                <p>
                  - {inputValue}
                  {selectedCurrecyFrom} ➡️{" "}
                  {convertedValue.toFixed(2).replace(/[.,]00$/, "")}
                  {selectedCurrecyTo}
                </p>
              </div>
            )
          )
        ) : (
          <p className={styles.defaultMessage}>
            Select currencies and enter amount to convert. 💱
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
