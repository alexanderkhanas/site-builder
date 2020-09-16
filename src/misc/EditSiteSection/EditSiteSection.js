import React, { useEffect, useState } from "react";
import s from "./EditSiteSection.module.css";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import classnames from "classnames";
import { uploadImageAction } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { AiOutlinePlus, FiRefreshCw } from "react-icons/all";
import { fetchRefreshedText } from "../../store/api/api";
import Button from "../Button/Button";

const EditSiteSection = ({
  section,
  setSectionVariation,
  onEdit,
  hide,
  uploadImage,
  uploadImages,
  values = {},
  sectionsVariations,
}) => {
  const [textareaArrays, setTextareaArrays] = useState({});
  const [textArrays, setTextArrays] = useState({});
  const { id } = useParams();

  console.log("values ===", values);

  const addItem = (name) => {};

  const onArrayItemChangeText = (value, index, key) => {
    const temp = [...values[key]];
    temp[index] = value;
    onEdit(section.categoryID, key, temp);
  };

  const onImageLoad = async (images, type) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("imageFile[]", image);
    });
    formData.append("type", type);
    const data = await uploadImage(formData);
    if (data?.url) {
      onEdit(section.categoryID, type, data?.url);
    }
  };

  const onRefreshClick = async (type) => {
    const response = await fetchRefreshedText(id, "ua", type);
    if (response?.status === 200) {
      const { desc } = response.data.text;
      onEdit(section.categoryID, type, desc);
    }
  };

  useEffect(() => {
    section.categoryParameters.forEach((parameter) => {
      const { type, id, key } = parameter;
      if (type === "textareaArray" || type === "textArray") {
        onEdit(section.categoryID, key, [""]);
      }
    });
  }, [section]);

  useEffect(() => {
    Object.keys(textArrays).forEach(([parameterId, textArray]) => {});
  }, [textArrays]);

  console.log("text area array ===", textareaArrays);
  console.log("text array ===", textArrays);

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
            isTextarea: type === "textarea" || type === "textareaArray",
            type: type.startsWith("color") ? "color" : "text",
          };
          const imageInputProps = {
            containerClass: s.field__container,
            type: "image",
            accept: "image/*",
            label: name,
            onChange: (files) => onImageLoad(files, key),
            key: id,
            multiple: type === "imgArray",
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
          if (type === "img" || type === "imgArray") {
            return <InputFile {...imageInputProps} />;
          }
          if (type === "textArray") {
            return (
              <div className={s.field__container}>
                {values[key]?.map((_, i) => (
                  <Input
                    {...inputProps}
                    onChange={({ target: { value } }) => {
                      onArrayItemChangeText(value, i, key);
                    }}
                    label={`${name} - ${i + 1}`}
                    key={`${id}${i}`}
                  />
                ))}
                <Button
                  className={s.add__button}
                  isRound
                  onClick={() => {
                    onEdit(section.categoryID, key, [...values[key], ""]);
                  }}
                >
                  <AiOutlinePlus className={s.icon} />
                </Button>
              </div>
            );
          }
          if (type === "textareaArray") {
            return (
              <div className={s.field__container}>
                {values[key]?.map((_, i) => (
                  <Input
                    {...inputProps}
                    value={values[key][i]}
                    onChange={({ target: { value } }) => {
                      onArrayItemChangeText(value, i, key);
                    }}
                    label={`${name} - ${i + 1}`}
                    key={`${id}${i}`}
                  />
                ))}
                <Button
                  className={s.add__button}
                  isRound
                  onClick={() => {
                    onEdit(section.categoryID, key, [...values[key], ""]);
                  }}
                >
                  <AiOutlinePlus className={s.icon} />
                </Button>
              </div>
            );
          }
          if (type === "review") {
            console.log("values ===", values);
            return (
              <div className={s.field__container}>
                {values[type].map((review, i) => (
                  <div className={s.field__container}>
                    <Input />
                  </div>
                ))}
              </div>
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
