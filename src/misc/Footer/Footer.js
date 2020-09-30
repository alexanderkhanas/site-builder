import React from "react";
import s from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.column}>
        <Link to="/public-offer">Публічна оферта</Link>
        <Link to="/about">Про нас</Link>
        <Link to="/about">Про нас</Link>
      </div>
    </div>
  );
};

export default Footer;
