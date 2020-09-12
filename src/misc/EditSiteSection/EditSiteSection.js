import React, { useEffect, useState } from "react";
import s from "./EditSiteSection.module.css";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";

const EditSiteSection = ({ section, onEdit, hide }) => {
  const [inputsTypes, setInputsTypes] = useState({});
  useEffect(() => {
    const temp = {};
    section.categoryParameters.forEach((parameter) => {
      const { type } = parameter;
      if (temp[type]) {
        return temp[type].push(parameter);
      }
      temp[type] = [parameter];
    });
    setInputsTypes(temp);
  }, [section]);
  return (
    <>
      <div className={s.container}>
        <h2 className={s.title}>Редагування блоку</h2>
        <div />
        {inputsTypes.text?.map(({ name, id, key }) => (
          <Input
            containerClass={s.field__container}
            label={name}
            key={id}
            onChange={({ target: { value } }) => {
              onEdit(section.categoryID, key, value);
            }}
          />
        ))}
        {inputsTypes.img?.map(({ name, id }) => (
          <InputFile
            containerClass={s.field__container}
            type="image"
            accept="image/*"
            label={name}
            key={id}
          />
        ))}
      </div>
      <div className={s.overlay} onClick={hide} />
    </>
  );
};

export default EditSiteSection;
