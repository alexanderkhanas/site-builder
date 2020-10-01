import React from "react";
import classnames from "classnames";
import s from "./Checkbox.module.css";

const Checkbox = ({
  onChange,
  checked,
  onTitleClick,
  title,
  containerClass,
  id,
  ...rest
}) => {
  return (
    <div className={classnames(s.checkbox__container, containerClass)}>
      <input
        {...{ onChange }}
        {...{ checked }}
        type="checkbox"
        {...{ id }}
        {...rest}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={id} style={{ width: "10px", height: "10px" }} />
    </div>
  );
};

export default Checkbox;
