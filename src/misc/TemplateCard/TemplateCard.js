import React from "react";
import s from "./TemplateCard.module.css";
import Button from "../Button/Button";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";
import { useHistory } from "react-router";

const TemplateCard = ({ onSubmit, template, demoText, selectText }) => {
  const history = useHistory();
  const { name, img, demo, desc, id } = template;
  const redirectToSingle = () => history.push(`/create-site/${id}`);
  return (
    <CardWrapper>
      <div className={s.container}>
        <img
          className={s.img}
          src={
            img
              ? `https://topfractal.com/${img}`
              : "https://designshack.net/wp-content/uploads/placeholder-image.png"
          }
          alt="loading"
        />
        <div className={s.footer}>
          <div className={s.footer__info}>
            <h4 className={s.footer__title}>{name}</h4>
            {!!desc && <p className={s.footer__desc}>{desc}</p>}
          </div>
          <div className={s.buttons__container}>
            <Button
              title={selectText}
              className={s.button}
              onClick={redirectToSingle}
            />
            {!!demo && (
              <Button
                title={demoText}
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
    </CardWrapper>
  );
};

export default TemplateCard;
