import React from "react";
import s from "./Input.module.css";
import classnames from "classnames";

const Input = ({
  Icon,
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  containerClass,
  inputClass,
  iconClass,
  isError,
  children,
  isTextarea,
  ...rest
}) => {
  return (
    <div className={classnames(s.container, containerClass)}>
      {!!label && <span className={s.label}>{label}</span>}
      <div
        className={classnames(s.container__input, {
          [s.error__container]: isError,
        })}
      >
        <Icon className={`${s.icon} ${iconClass}`} />
        {!isTextarea ? (
          <input
            {...{ type }}
            {...{ value }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              [s.padding]: !!Icon,
            })}
            {...{ placeholder }}
            {...rest}
          />
        ) : (
          <textarea
            {...{ type }}
            {...{ value }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              [s.error__input]: isError,
            })}
            {...{ placeholder }}
            {...rest}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Input;
