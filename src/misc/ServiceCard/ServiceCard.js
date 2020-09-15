import React from "react";
import s from "./ServiceCard.module.css";
import Button from "../Button/Button";

const ServiceCard = ({ service, selectText, onSelect = () => {} }) => {
  console.log("service ===", service);
  const { name, desk: desc } = service;
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>{name}</h3>
      </div>
      <div className={s.main__content}>
        <p className={s.desc}>{desc}</p>
        <Button className={s.button} title={selectText} onClick={onSelect} />
      </div>
    </div>
  );
};

export default ServiceCard;
