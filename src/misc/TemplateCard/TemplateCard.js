import React from "react";
import s from "./TemplateCard.module.css";
import Button from "../Button/Button";

const TemplateCard = ({ onSubmit, template }) => {
  const { name, img, demo } = template;
  return (
    <div className={s.container}>
      <img
        className={s.img}
        src={
          img
            ? `https://dent.eco/${img}`
            : "https://designshack.net/wp-content/uploads/placeholder-image.png"
        }
        alt="loading"
      />
      <div className={s.footer}>
        <div className={s.footer__info}>
          <h4 className={s.footer__title}>{name}</h4>
        </div>
        <div className={s.buttons__container}>
          <Button title="Обрати" className={s.button} onClick={onSubmit} />
          {!!demo && (
            <Button
              title="Демо"
              isLink
              href={demo}
              target="_blank"
              className={s.button}
              onClick={onSubmit}
              isSecondary
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
