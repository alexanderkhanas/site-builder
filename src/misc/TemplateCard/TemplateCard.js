import React from "react";
import s from "./TemplateCard.module.css";
import Button from "../Button/Button";

const TemplateCard = ({ title, desc, onSubmit }) => {
  return (
    <div className={s.container}>
      <img
        className={s.img}
        src="https://designshack.net/wp-content/uploads/placeholder-image.png"
        alt="loading"
      />
      <div className={s.footer}>
        <div className={s.footer__info}>
          <h4 className={s.footer__title}>{title}</h4>
          <p className={s.footer__desc}>{desc}</p>
        </div>
        <div className={s.buttons__container}>
          <Button title="Обрати" className={s.button} onClick={onSubmit} />
          <Button
            title="Демо"
            isLink
            href="https://google.com"
            className={s.button}
            onClick={onSubmit}
            isSecondary
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
