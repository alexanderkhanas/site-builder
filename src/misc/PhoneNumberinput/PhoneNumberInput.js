import React from "react";
import InputMask from "react-input-mask";
import Input from "../Input/Input";

const PhoneNumberInput = ({
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  children,
  ...rest
}) => (
  <InputMask
    mask="+380-99-999-9999"
    placeholder="+380-99-123-4567"
    maskChar={null}
    {...{ value }}
    {...{ onFocus }}
    {...{ onBlur }}
    {...{ onChange }}
  >
    {(inputProps) => (
      <Input {...rest} {...inputProps} type="tel">
        {children}
      </Input>
    )}
  </InputMask>
);
export default PhoneNumberInput;
