import { FC, ReactElement } from "react";

import styles from "./ResultCard.module.sass";

type ResultCardProps = {
  convertedValue: number | undefined;
  selectedCurrecyTo: string | undefined;
};

const ResultCard: FC<ResultCardProps> = ({
  convertedValue,
  selectedCurrecyTo,
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
        <h1 className={styles.header}>The result of your conversion is:</h1>
        {convertedValue !== undefined ? (
          <p>
            {convertedValue.toFixed(2).replace(/[.,]00$/, "")}{" "}
            {selectedCurrecyTo}
          </p>
        ) : (
          <p className={styles.defaultMessage}>---</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
