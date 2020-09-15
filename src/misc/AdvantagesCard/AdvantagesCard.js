import React from "react";
import s from "./AdvantagesCard.module.css";

const AdvantagesCard = ({ img, title, desc }) => {
  return (
    <div className={s.container}>
      <img src={img} alt="loading" className={s.image} />
      <h4 className={s.title}>{title}</h4>
      <p className={s.desc}>{desc}</p>
    </div>
  );
};

export default AdvantagesCard;
