import React from "react";
import classnames from "classnames";
import s from "./Checkbox.module.css";

const Checkbox = ({
  onChange,
  checked,
  onTitleClick,
  title,
  containerStyle,
  id,
  ...rest
}) => {
  return (
    <div className={classnames(s.checkbox__container, containerStyle)}>
      <input
        onChange={onChange}
        {...{ checked }}
        type="checkbox"
        {...{ id }}
        {...rest}
      />
      <label htmlFor={id} style={{ width: "10px", height: "10px" }} />
    </div>
  );
};

export default Checkbox;
