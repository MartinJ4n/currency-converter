import { useState, FC, ReactElement } from "react";
import { motion } from "framer-motion";

import styles from "./Dropdown.module.sass";

type DropdownProps = {
  currencies: {
    name: string;
    selected: boolean;
  }[];
  onCurrencySelection: (currency: string) => void;
};

const Dropdown: FC<DropdownProps> = ({
  currencies,
  onCurrencySelection,
}): ReactElement => {
  const [selectionToggle, setSelectionToggle] = useState(false);

  const handleSelectionToggle = () => {
    setSelectionToggle(!selectionToggle);
  };

  const handleCurrencySelection = (name: string) => {
    onCurrencySelection(name);
    setSelectionToggle(false);
  };

  return (
    <div className={styles.wrapper} data-cy="dropdown">
      <div className={styles.dropdownItem} onClick={handleSelectionToggle}>
        <p>{currencies.find(({ selected }) => selected === true)?.name}</p>
      </div>

      <motion.div
        data-cy="dropdownBox"
        animate={{ height: selectionToggle ? "300px" : 0 }}
        transition={{ duration: 0.2 }}
        className={styles.dropdownBox}
      >
        {currencies
          .filter(({ selected }) => selected !== true)
          .map(({ name }, index) => (
            <div className={styles.dropdownItem} key={index}>
              <p onClick={() => handleCurrencySelection(name)}>{name}</p>
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default Dropdown;
