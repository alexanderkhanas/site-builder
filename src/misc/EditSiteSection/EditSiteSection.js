import React, { useEffect, useState } from "react";
import s from "./EditSiteSection.module.css";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import classnames from "classnames";
import { uploadImageAction } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { ReactComponent as FiRefreshCw } from "../../assets/refresh-icon.svg";
import { ReactComponent as AiOutlinePlus } from "../../assets/plus.svg";
import { ReactComponent as FaTimes } from "../../assets/times.svg";
import { ReactComponent as BiTrash } from "../../assets/trash.svg";
import { fetchRefreshedText, postImage } from "../../store/api/api";
import Button from "../Button/Button";
import PhoneNumberInput from "../PhoneNumberinput/PhoneNumberInput";
import {
  addDefaultImageAction,
  getDefaultImagesAction,
} from "../../store/actions/siteActions";
import ImageSectionPicker from "../ImageSectionPicker/ImageSectionPicker";

const EditSiteSection = ({
  section,
  setSectionVariation,
  onEdit: saveState,
  hide,
  uploadImage,
  values = {},
  sectionsVariations,
  getDefaultImages,
  images,
  templateId,
  addDefaultImage,
}) => {
  // const { id } = useParams();
  const [changingState, setChangingState] = useState({});

  const onEdit = (key, value) => {
    setChangingState((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveButtonClick = () => {
    Object.entries(changingState).forEach(([key, value]) => {
      saveState(section.categoryID, key, value);
    });
    hide();
  };
  const templateImgs = images[templateId];

  const addGroupItem = (key, defaultValue) => {
    onEdit(key, [...changingState[key], defaultValue]);
  };

  const deleteGroupItem = (key, index) => {
    if (changingState[key?.length] <= 1) return;
    const editedArray = [...changingState[key]].filter((_, i) => i !== index);
    onEdit(key, editedArray);
  };

  const onArrayItemChangeText = (value, index, key) => {
    const temp = [...changingState[key]];
    temp[index] = value;
    onEdit(key, temp);
  };

  const onGroupInputChange = (value, index, key, type) => {
    const temp = [...values[type]];
    temp[index][key] = value;
    onEdit(type, temp);
  };

  const onReviewChange = (value, index, key) => {
    const temp = [...values.reviews];
    temp[index][key] = value;
    onEdit("reviews", temp);
  };

  const onSingleImageSelect = (img, key) => {
    onEdit(key, img);
  };

  const onMultipleImagesSelect = (img, key, selectedImages, isSelected) => {
    if (isSelected) {
      onEdit(
        section.categoryID,
        key,
        selectedImages.filter((selectedImage) => selectedImage !== img)
      );
    } else {
      onEdit(key, [...selectedImages, img]);
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
      onEdit("teams", temp);
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
      onEdit("social", temp);
    }
  };

  const onImageLoad = async (images, type) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("imageFile[]", image);
    });
    formData.append("type", type);
    const data = await uploadImage(formData, type);
    addDefaultImage(
      Array.isArray(data?.url) && data?.url.length === 1
        ? data?.url[0]
        : data?.url,
      type,
      templateId
    );
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
      onEdit(type, desc);
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
        onEdit(key, [""]);
      }
    });
  }, [section]);

  useEffect(() => {
    setChangingState(values);
  }, [values]);

  console.log("changing state ===", changingState);

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
            value: changingState[key],
            key: `${id}${i}${name}`,
            onChange: ({ target: { value } }) => {
              onEdit(key, value);
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
            return (
              <div style={{ margin: "40px 0" }}>
                <p className={s.label}>{name}</p>
                {type === "img" ? (
                  <img
                    src={`https://topfractal.com/${changingState[key]}`}
                    className={`${s.image} ${s.image__active}`}
                    alt="loading"
                  />
                ) : (
                  changingState[key]?.map((img, imgIndex) => {
                    return (
                      <img
                        src={`https://topfractal.com/${img}`}
                        key={`image_array${img}${imgIndex}`}
                        className={`${s.image} ${s.image__active}`}
                        alt="loading"
                      />
                    );
                  })
                )}
                {!!templateImgs && (
                  <ImageSectionPicker
                    onSelect={(img, isSelected) => {
                      if (type === "imgArray") {
                        onMultipleImagesSelect(
                          img,
                          key,
                          changingState[key] || [],
                          isSelected
                        );
                        return;
                      }
                      onSingleImageSelect(img, key);
                    }}
                    activeImages={
                      type === "imgArray"
                        ? changingState[key] || []
                        : [changingState[key]]
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
                {changingState[key]?.map((_, i) => (
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
                    onEdit(key, [...changingState[key], ""]);
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
                {changingState[key]?.map((_, i) => (
                  <Input
                    {...inputProps}
                    value={changingState[key][i]}
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
                    onEdit(key, [...changingState[key], ""]);
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
                  {changingState.reviews?.map((review, i) => (
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
                  {changingState.teams?.map((team, i) => {
                    return (
                      <div className={s.group} key={`${type}${i}`}>
                        <div className={s.group__main__content}>
                          {!!team.foto && (
                            <img
                              src={`https://topfractal.com/${team.foto}`}
                              alt="loading"
                              className={`${s.image} ${s.image__active}`}
                            />
                          )}
                          <InputFile
                            type="image"
                            withPreview={false}
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
                    );
                  })}
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
                  {changingState.social?.map((socialObj, i) => (
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
                            onGroupInputChange(value, i, "value", key);
                          }}
                          placeholder={socialObj.placeholder}
                          label="Посилання на соціальну мережу"
                          value={socialObj.value}
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
        <div className={s.buttons}>
          <Button
            onClick={onSaveButtonClick}
            size="lg"
            className={s.save__button}
            title="Зберегти"
          />
        </div>
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
  uploadImage: (imageFormData, type) =>
    dispatch(uploadImageAction(imageFormData, type)),
  getDefaultImages: (templateId, type) =>
    dispatch(getDefaultImagesAction(templateId, type)),
  addDefaultImage: (image, type, templateId) =>
    dispatch(addDefaultImageAction(image, type, templateId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteSection);
