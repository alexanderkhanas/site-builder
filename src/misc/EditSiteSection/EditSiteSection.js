import React, { useEffect, useState } from "react";
import s from "./EditSiteSection.module.css";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import classnames from "classnames";
import { uploadImageAction } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { FiRefreshCw } from "react-icons/all";
import { fetchRefreshedText } from "../../store/api/api";

const EditSiteSection = ({
  section,
  setSectionVariation,
  onEdit,
  hide,
  uploadImage,
  values = {},
  sectionsVariations,
}) => {
  const [inputsTypes, setInputsTypes] = useState({});
  const { id } = useParams();

  const onImageLoad = async ([image], type) => {
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("type", type);
    const data = await uploadImage(formData);
    if (data?.url) {
      onEdit(section.categoryID, type, data?.url);
    }
    console.log("response data ===", data);
  };

  const onRefreshClick = async (type) => {
    const response = await fetchRefreshedText(id, "ua", type);
    console.log("response ===", response?.data?.text);
    if (response?.status === 200) {
      const { desc } = response.data.text;
      onEdit(section.categoryID, type, desc);
    }
  };

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
        <h2 className={s.title}>Обрати вигляд</h2>
        <div className={s.variations__container}>
          {sectionsVariations[section.categoryID]?.map((variation) => (
            <img
              key={variation.id}
              src={`https://topfractal.com/${variation.thumbnail}`}
              alt="loading"
              onClick={() => setSectionVariation(section, variation)}
              className={classnames(s.variation, {
                [s.variation__active]: variation.id === section.element.id,
              })}
            />
          ))}
        </div>
        <h2 className={s.title}>Редагування блоку</h2>

        {section.categoryParameters.map((parameter) => {
          const { type, name, key, id } = parameter;
          const inputProps = {
            containerClass: s.field__container,
            label: name,
            value: values[key],
            key: id,
            onChange: ({ target: { value } }) => {
              onEdit(section.categoryID, key, value);
            },
            isTextarea: type === "textarea",
            type: type.startsWith("color") ? "color" : "text",
          };
          if (
            type === "text" ||
            type === "textarea" ||
            type === "color1" ||
            type === "color2" ||
            type === "color3"
          ) {
            return (
              <Input {...inputProps}>
                {inputProps.type !== "color" && (
                  <FiRefreshCw
                    onClick={() => onRefreshClick(key)}
                    className={s.refresh__icon}
                  />
                )}
              </Input>
            );
          }
          if (type === "img") {
            return (
              <InputFile
                containerClass={s.field__container}
                type="image"
                accept="image/*"
                label={name}
                onChange={(files) => onImageLoad(files, key)}
                key={id}
              />
            );
          }
          return <div />;
        })}
      </div>
      <div className={s.overlay} onClick={hide} />
    </>
  );
};

const mapStateToProps = (state) => ({
  sectionsVariations: state.createSite.sectionsVariations,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (imageFormData) => dispatch(uploadImageAction(imageFormData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteSection);
