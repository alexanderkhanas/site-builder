import React from "react";
import s from "./TariffCard.module.css";
import classnames from "classnames";
import Button from "../Button/Button";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";

const TariffCard = ({ isPrimary, tariff, selectText, priceText }) => {
  const { tariff_price: tariffPrices, tariff_text: tariffTexts } = tariff;
  console.log("tariff ===", tariff);
  return (
    <CardWrapper className={s.container}>
      <div>
        <div
          className={classnames(s.header, { [s.header__primary]: isPrimary })}
        >
          <h4 className={s.title}>БАЗОВИЙ</h4>
          <h3 className={s.price}>
            {tariffPrices[0].value} {priceText}
          </h3>
        </div>
        <div className={s.main__content}>
          {tariffTexts.slice(0, 6).map((text) => (
            <div className={s.desc}>
              <p>{text.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={s.button__container}>
        <Button className={s.button} title={selectText} />
      </div>
    </CardWrapper>
  );
};

export default TariffCard;
