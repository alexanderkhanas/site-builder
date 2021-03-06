import React from "react";
import s from "./SiteSection.module.css";
import Button from "../Button/Button";
import classnames from "classnames";
import { connect } from "react-redux";

const SiteSection = ({
  section,
  addSection,
  removeSection,
  isActive,
  showEditingModal,
  reference,
  content,
  ...rest
}) => {
  const { categoryID, element } = section || {};

  const { demo: demoText } = content.page_content.home;

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
        <div className={s.element__main__container}>
          <img
            onClick={switchCheckbox}
            src={`https://topfractal.com/${element.thumbnail}`}
            alt="loading"
            className={s.element__img}
          />
          <div className={s.element__main}>
            <h3 className={s.element__name}>{element.name}</h3>
            <div className={s.buttons}>
              <div>
                <Button
                  title="Редагувати"
                  size="md"
                  onClick={onEditClick}
                  className={s.element__button}
                />
              </div>
              <Button
                title={demoText}
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

const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps, null)(SiteSection);
