import { FC, ReactElement } from "react";

import styles from "./RecentlyAddedCard.module.sass";

type RecentlyAddedCardProps = {
  historicalData: {
    inputValue: number | undefined;
    convertedValue: number;
    selectedCurrecyFrom: string;
    selectedCurrecyTo: string;
  }[];
  onConvertionRecovery: (historicalData: {
    inputValue: number | undefined;
    convertedValue: number;
    selectedCurrecyFrom: string;
    selectedCurrecyTo: string;
  }) => void;
};

const RecentlyAddedCard: FC<RecentlyAddedCardProps> = ({
  historicalData,
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

        {historicalData.length !== 0 ? (
          historicalData.map((data, index) => (
            <div
              className={styles.detailsBox}
              key={index}
              onClick={() => onConvertionRecovery(data)}
            >
              <p>
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
