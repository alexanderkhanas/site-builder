import React, { useEffect, useState } from "react";
import s from "./EditSiteSection.module.css";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import classnames from "classnames";
import { uploadImageAction } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { AiOutlinePlus, BiTrash, FaTimes, FiRefreshCw } from "react-icons/all";
import { fetchRefreshedText, postImage } from "../../store/api/api";
import Button from "../Button/Button";
import PhoneNumberInput from "../PhoneNumberinput/PhoneNumberInput";
import { getDefaultImagesAction } from "../../store/actions/siteActions";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ImageZoom from "react-img-zoom";
import ImageSectionPicker from "../ImageSectionPicker/ImageSectionPicker";

const EditSiteSection = ({
  section,
  setSectionVariation,
  onEdit,
  hide,
  uploadImage,
  values = {},
  sectionsVariations,
  getDefaultImages,
  images,
  templateId,
}) => {
  // const { id } = useParams();

  const templateImgs = images[templateId];

  const addGroupItem = (key, defaultValue) => {
    onEdit(section.categoryID, key, [...values[key], defaultValue]);
  };

  const deleteGroupItem = (key, index) => {
    if (values[key]?.length <= 1) return;
    const editedArray = [...values[key]].filter((_, i) => i !== index);
    onEdit(section.categoryID, key, editedArray);
  };

  const onArrayItemChangeText = (value, index, key) => {
    const temp = [...values[key]];
    temp[index] = value;
    onEdit(section.categoryID, key, temp);
  };

  const onGroupInputChange = (value, index, key, type) => {
    const temp = [...values[type]];
    temp[index][key] = value;
    onEdit(section.categoryID, type, temp);
  };

  const onReviewChange = (value, index, key) => {
    const temp = [...values.reviews];
    temp[index][key] = value;
    onEdit(section.categoryID, "reviews", temp);
  };

  const onSingleImageSelect = (img, key) => {
    onEdit(section.categoryID, key, img);
  };

  const onMultipleImagesSelect = (img, key, selectedImages, isSelected) => {
    console.log("is selected ===", isSelected);
    if (isSelected) {
      onEdit(
        section.categoryID,
        key,
        selectedImages.filter((selectedImage) => selectedImage !== img)
      );
    } else {
      onEdit(section.categoryID, key, [...selectedImages, img]);
    }
  };

  const onTeamImageLoad = async (images, index, key, type) => {
    const temp = [...values.teams];
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("imageFile[]", image);
    });
    formData.append("type", "teams");
    const response = await postImage(formData);
    const { data } = response;
    temp[index][key] = data?.url[0];
    if (data?.url) {
      onEdit(section.categoryID, "teams", temp);
    }
  };

  const onSocialImageLoad = async (images, index, key, type) => {
    const temp = [...values.social];
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("imageFile[]", image);
    });
    formData.append("type", "teams");
    const response = await postImage(formData);
    const { data } = response;
    temp[index][key] = data?.url[0];
    if (data?.url) {
      onEdit(section.categoryID, "social", temp);
    }
  };

  const onImageLoad = async (images, type) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("imageFile[]", image);
    });
    formData.append("type", type);
    const data = await uploadImage(formData);
    if (data?.url) {
      onEdit(
        section.categoryID,
        type,
        Array.isArray(data?.url) && data?.url.length === 1
          ? data?.url[0]
          : data?.url
      );
    }
  };

  const onRefreshClick = async (type) => {
    const response = await fetchRefreshedText(templateId, "ua", type);
    if (response?.status === 200) {
      const { desc } = response.data.text;
      onEdit(section.categoryID, type, desc);
    }
  };

  useEffect(() => {
    section.categoryParameters.forEach((parameter) => {
      const { type, key } = parameter;
      if (type === "img" || type === "imgArray") {
        getDefaultImages(templateId, key);
        return;
      }
      if (type === "textareaArray" || type === "textArray") {
        onEdit(section.categoryID, key, [""]);
      }
    });
  }, [section]);

  return (
    <>
      <div className={s.container}>
        <FaTimes onClick={hide} className={s.close__button} />
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

        {section.categoryParameters.map((parameter, i) => {
          const { type, name, key, id } = parameter;
          if (key === "organizationName") {
            return;
          }
          const inputProps = {
            containerClass: s.field__container,
            label: name,
            value: values[key],
            key: `${id}${i}${name}`,
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
            type === "color3" ||
            type === "email"
          ) {
            return (
              <Input {...inputProps}>
                {inputProps.type !== "color" && type !== "email" && (
                  <FiRefreshCw
                    onClick={() => onRefreshClick(key)}
                    className={s.refresh__icon}
                  />
                )}
              </Input>
            );
          }
          if (type === "phone") {
            return <PhoneNumberInput {...inputProps} />;
          }
          if (type === "img" || type === "imgArray") {
            console.log("template imgs ===", templateImgs);
            return (
              <div style={{ margin: "40px 0" }}>
                <span className={s.label}>{name}</span>
                {!!templateImgs && (
                  <ImageSectionPicker
                    onSelect={(img, isSelected) => {
                      if (type === "imgArray") {
                        onMultipleImagesSelect(
                          img,
                          key,
                          values[key] || [],
                          isSelected
                        );
                        return;
                      }
                      onSingleImageSelect(img, key);
                    }}
                    activeImages={
                      type === "imgArray" ? values[key] || [] : [values[key]]
                    }
                    userImages={templateImgs[key]?.user}
                    adminImages={templateImgs[key]?.admin}
                  />
                )}
                <InputFile {...imageInputProps} label="" />
              </div>
            );
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
          if (type === "reviewsArray") {
            return (
              <div className={s.field__container}>
                <div className={s.field}>
                  {values.reviews.map((review, i) => (
                    <div className={s.group}>
                      <div className={s.group__main__content}>
                        <div className={s.field__container} key={`${type}${i}`}>
                          <Input
                            containerClass={s.field__container}
                            isTextarea
                            onChange={({ target: { value } }) => {
                              onReviewChange(value, i, "value");
                            }}
                            label="Відгук"
                            value={review.value}
                          />
                          <Input
                            label="Автор відгука"
                            onChange={({ target: { value } }) => {
                              onReviewChange(value, i, "name");
                            }}
                            value={review.name}
                          />
                        </div>
                      </div>
                      <div className={s.delete__icon__container}>
                        <BiTrash
                          className={s.delete__icon}
                          onClick={() => deleteGroupItem(key, i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className={s.add__button}
                  isRound
                  onClick={() => {
                    addGroupItem(key, { name: "", value: "" });
                  }}
                >
                  <AiOutlinePlus className={s.icon} />
                </Button>
              </div>
            );
          }
          if (type === "teamArray") {
            return (
              <div className={s.field__container}>
                <div className={s.field}>
                  {values.teams.map((team, i) => (
                    <div className={s.group} key={`${type}${i}`}>
                      <div className={s.group__main__content}>
                        <InputFile
                          type="image"
                          onChange={(value) => {
                            onTeamImageLoad(value, i, "foto", type);
                          }}
                          label="Фото"
                        />
                        <Input
                          containerClass={s.field__container}
                          isTextarea
                          onChange={({ target: { value } }) => {
                            onGroupInputChange(value, i, "value", key);
                          }}
                          label="Професія"
                          value={team.value}
                        />
                        <Input
                          label="Ім'я"
                          onChange={({ target: { value } }) => {
                            onGroupInputChange(value, i, "name", key);
                          }}
                          value={team.name}
                        />
                      </div>
                      <div className={s.delete__icon__container}>
                        <BiTrash
                          className={s.delete__icon}
                          onClick={() => deleteGroupItem(key, i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className={s.add__button}
                  isRound
                  onClick={() => {
                    addGroupItem(key, { name: "", value: "" });
                  }}
                >
                  <AiOutlinePlus className={s.icon} />
                </Button>
              </div>
            );
          }
          if (type === "social") {
            return (
              <div className={s.field__container}>
                <h4 className={s.section__subtitle}>Соціальні мережі</h4>
                <div className={s.field}>
                  {values.social.map((socialObj, i) => (
                    <div className={s.group} key={`${type}${i}`}>
                      <div className={s.group__main__content}>
                        <InputFile
                          //{...inputProps}
                          containerClass={s.field__container}
                          type="image"
                          onChange={(value) => {
                            onSocialImageLoad(value, i, "img", type);
                          }}
                          label="Фото"
                        />
                        <Input
                          containerClass={s.field__container}
                          {...inputProps}
                          isTextarea
                          onChange={({ target: { value } }) => {
                            onGroupInputChange(value, i, "url", key);
                          }}
                          label="Посилання на соціальну мережу"
                          value={socialObj.url}
                        />
                        <Input
                          {...inputProps}
                          label="Назва"
                          onChange={({ target: { value } }) => {
                            onGroupInputChange(value, i, "name", key);
                          }}
                          value={socialObj.name}
                        />
                      </div>
                      <div className={s.delete__icon__container}>
                        <BiTrash
                          className={s.delete__icon}
                          onClick={() => deleteGroupItem(key, i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className={s.add__button}
                  isRound
                  onClick={() => {
                    addGroupItem(key, { name: "", url: "", img: "" });
                  }}
                >
                  <AiOutlinePlus className={s.icon} />
                </Button>
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
  sectionsVariations: state.site.sectionsVariations,
  images: state.site.images,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (imageFormData) => dispatch(uploadImageAction(imageFormData)),
  getDefaultImages: (templateId, type) =>
    dispatch(getDefaultImagesAction(templateId, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteSection);
