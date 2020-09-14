import React, { useState } from "react";
import s from "./SiteSection.module.css";
import Button from "../Button/Button";
import classnames from "classnames";

const SiteSection = ({
  section,
  addSection,
  replaceBlock,
  removeSection,
  isActive,
  showEditingModal,
}) => {
  const { categoryParameters, categoryID, element } = section || {};

  const onReplaceClick = () => {
    replaceBlock(section);
  };

  const onCheckboxChange = () => {
    if (isActive) {
      return removeSection(section);
    }
    addSection(section);
  };

  const onEditClick = () => {
    showEditingModal(section);
  };

  return (
    <div
      className={classnames(s.container, { [s.container__active]: isActive })}
    >
      <div className={s.element}>
        <div className={s.element__main__container}>
          <img
            src={`https://dent.eco/${element.thumbnail}`}
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
                title="Замінити блок"
                className={s.element__button}
                isSecondary
                size="sm"
              />
              <Button
                title="Демо"
                isSecondary
                isLink
                target="_blank"
                size="sm"
                href={`https://dent.eco/${element.url}`}
              />
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default SiteSection;
