import { FC, ReactElement } from "react";

import styles from "./Input.module.sass";

interface InputProps {
  value: number;
  name: string;
  type: string;
  category: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const Input: FC<InputProps> = ({
  value,
  name,
  type,
  placeholder = "...",
  disabled = false,
  onChange,
}): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <input
        data-cy="amountInput"
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
