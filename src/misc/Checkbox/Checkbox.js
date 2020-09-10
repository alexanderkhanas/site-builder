import React from "react";
import classnames from "classnames";
import s from "./Checkbox.module.css";

const Checkbox = ({
  onChange,
  checked,
  onTitleClick,
  title,
  containerStyle,
  ...rest
}) => {
  return (
    <div className={classnames(s.container, containerStyle)}>
      <input
        type="checkbox"
        className={s.checkbox}
        {...{ checked }}
        {...{ onChange }}
        {...rest}
      />
      <span onClick={onTitleClick} className={s.title}>
        {title}
      </span>
    </div>
  );
};

export default Checkbox;
