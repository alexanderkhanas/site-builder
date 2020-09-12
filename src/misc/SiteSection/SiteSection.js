import React, { useState } from "react";
import s from "./SiteSection.module.css";
import Button from "../Button/Button";

const SiteSection = ({
  section,
  addSection,
  removeSection,
  isActive,
  showEditingModal,
}) => {
  const {
    categoryParameters,
    categoryID,
    "element ": [content],
  } = section || {};

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
    <div className={s.container}>
      <div className={s.element}>
        <div className={s.element__main__container}>
          <img
            src={`https://dent.eco/${content.thumbnail}`}
            alt="loading"
            className={s.element__img}
          />
          <div className={s.element__main}>
            <h3 className={s.element__name}>{content.name}</h3>
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
                // href={`https://dent.eco/${content.url}`}
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
