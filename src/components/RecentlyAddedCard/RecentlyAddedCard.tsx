import { FC, ReactElement } from "react";
import { HistoricalData } from "../../interfaces";

import styles from "./RecentlyAddedCard.module.sass";

type RecentlyAddedCardProps = {
  recentlyAddedData: HistoricalData[];
  onConvertionRecovery: (historicalData: HistoricalData) => void;
};

const RecentlyAddedCard: FC<RecentlyAddedCardProps> = ({
  recentlyAddedData,
  onConvertionRecovery,
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
        <h1 className={styles.header}>Recently Added:</h1>

        {recentlyAddedData.length !== 0 ? (
          recentlyAddedData.map((data, index) => (
            <div
              className={styles.detailsBox}
              key={index}
              onClick={() => onConvertionRecovery(data)}
            >
              <p data-cy="recentlyAddedResults">
                {data.inputValue}
                {data.selectedCurrecyFrom} ➡️{" "}
                {data.convertedValue.toFixed(2).replace(/[.,]00$/, "")}
                {data.selectedCurrecyTo}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.defaultMessage}>
            Select currencies and enter amount to convert. 💱
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
