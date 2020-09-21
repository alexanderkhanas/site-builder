import React from "react";
import s from "./AdvantagesCard.module.css";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";

const AdvantagesCard = ({ img, title, desc }) => {
  return (
    <CardWrapper className={s.container}>
      <img src={img} alt="loading" className={s.image} />
      <h4 className={s.title}>{title}</h4>
      <p className={s.desc}>{desc}</p>
    </CardWrapper>
  );
};

export default AdvantagesCard;
