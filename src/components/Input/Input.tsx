import { FC, ReactElement, KeyboardEvent } from "react";

import { Wrapper, InputSC } from "./styles";

interface InputProps {
  value: number;
  name: string;
  type: string;
  category: string;
  label?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

const Input: FC<InputProps> = ({
  value,
  name,
  type,
  label,
  width = "100%",
  height = "48px",
  placeholder = "...",
  disabled = false,
  onChange,
  onKeyPress,
}): ReactElement => {
  return (
    <Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <InputSC
        value={value}
        name={name}
        type={type}
        width={width}
        height={height}
        placeholder={placeholder}
        disabled={disabled}
        //@ts-ignore
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress ? (e) => onKeyPress(e) : undefined}
      />
    </Wrapper>
  );
};

export default Input;
