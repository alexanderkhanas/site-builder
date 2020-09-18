import React from "react";
import s from "./SiteCard.module.css";

const SiteCard = ({ site }) => {
  const { logo, site_name: name } = site;
  return (
    <div className={s.container}>
      <img
        src={`https://topfractal.com/${logo}`}
        alt="loading"
        className={s.logo}
      />
      <div className={s.main__content}>
        <p className={s.title}>{name}</p>
      </div>
    </div>
  );
};

export default SiteCard;
