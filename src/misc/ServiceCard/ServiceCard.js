import React from "react";
import s from "./ServiceCard.module.css";
import Button from "../Button/Button";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";

const ServiceCard = ({ service, selectText, onSelect = () => {} }) => {
  const { name, desk: desc } = service;
  return (
    <CardWrapper className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>{name}</h3>
      </div>
      <div className={s.main__content}>
        <p className={s.desc}>{desc}</p>
        <Button className={s.button} title={selectText} onClick={onSelect} />
      </div>
    </CardWrapper>
  );
};

export default ServiceCard;
