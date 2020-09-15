import React from "react";
import s from "./CardWrapper.module.css";

const CardWrapper = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default CardWrapper;
