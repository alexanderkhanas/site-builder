import React, { useState } from "react";
import s from "./SiteSection.module.css";
import Button from "../Button/Button";
import classnames from "classnames";

const SiteSection = ({
  section,
  addSection,
  removeSection,
  isActive,
  showEditingModal,
  reference,
  ...rest
}) => {
  const { categoryID, element } = section || {};

  const onCheckboxChange = () => {
    if (isActive) {
      return removeSection(section);
    }
    addSection(section);
  };

  const onEditClick = () => {
    showEditingModal(section);
  };

  const switchCheckbox = () => {
    if (element.type === "required") return;
    if (isActive) {
      return removeSection(section);
    }
    addSection(section);
  };

  return (
    <div
      ref={reference}
      className={classnames(s.container, { [s.container__active]: isActive })}
      {...rest}
    >
      <div className={s.element}>
        <div className={s.element__main__container} onClick={switchCheckbox}>
          <img
            src={`https://topfractal.com/${element.thumbnail}`}
            alt="loading"
            className={s.element__img}
          />
          <div className={s.element__main}>
            <h3 className={s.element__name}>{element.name}</h3>
            <div>
              <Button
                title="Редагувати"
                size="sm"
                onClick={onEditClick}
                className={s.element__button}
              />
              <Button
                title="Демо"
                isSecondary
                isLink
                target="_blank"
                size="sm"
                href={`https://topfractal.com/${element.url}`}
              />
            </div>
          </div>
        </div>
        {element.type !== "required" && (
          <div className={s.checkbox__container}>
            <input
              onChange={onCheckboxChange}
              checked={isActive}
              type="checkbox"
              id={`${categoryID}checkbox`}
            />
            <label
              htmlFor={`${categoryID}checkbox`}
              style={{ width: "10px", height: "10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteSection;
