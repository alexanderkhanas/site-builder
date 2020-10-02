import React from "react";
import classnames from "classnames";

import s from "./CardWrapper.module.css";

const CardWrapper = ({ children, className }) => {
  return (
    <div className={`${s.container} ${s.wrapper} ${className}`}>{children}</div>
  );
};

export default CardWrapper;
