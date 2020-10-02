import React, { useEffect, useRef, useState } from "react";
import s from "./Gallery.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import {
  getUserGalleryAction,
  deleteImageAction,
  uploadUserImagesAction,
} from "../../store/actions/galleryActions";
import CustomTabs from "../../misc/CustomTabs/CustomTabs";
import FullPageLoader from "../../misc/FullPageLoader/FullPageLoader";
import { ReactComponent as BiTrash } from "../../assets/trash.svg";
import InputFile from "../../misc/InputFile/InputFile";

const Gallery = ({ deleteImage, uploadImage, getUserGallery, gallery, content }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const onImageLoad = (type, images) => {
    uploadImage(type, images);
  };

  // title(pin):"ГАЛЕРЕЯ"
  // upload_button(pin):"Завантажити"
  // no_images(pin):"Ви ще не завантажили фото для цієї категорії"
  // logo(pin):"Логотипи"
  // main(pin):"Основні"
  // about(pin):"Про нас"
  // team(pin):"Команда"
  // img(pin):"Портфоліо"

  useEffect(() => {
    (async () => {
      await getUserGallery();
      setLoading(false);
    })();
  }, []);

  return !isLoading ? (
    <FixedWrapper>
      <div className={s.container}>
        <h1 className={s.title}>{content.title}</h1>
        <CustomTabs
          tabListClass={s.tab__list}
          {...{ selectedTab }}
          {...{ setSelectedTab }}
          tabs={[content.logo, content.main, content.about, content.team, content.img]}
        >
          {[...Array(5)].map((_, i) => {
            const [key, images] = Object.entries(gallery)[i] || [];
            return (
              <div>
                <InputFile
                  onChange={(images) => onImageLoad(key, images)}
                  type="image"
                  multiple
                  text={content.upload_button}
                  accept="image/*"
                  withPreview={false}
                  containerClass={s.upload__input}
                />
                <div className={s.items__container}>
                  {images?.length ? (
                    images.map((img) => (
                      <div className={s.item}>
                        <BiTrash
                          className={s.delete__icon}
                          onClick={() => deleteImage(key, img)}
                        />
                        <img
                          key={`gallery${img}`}
                          src={`https://topfractal.com/${img}`}
                          className={s.item__image}
                          alt="loading"
                        />
                      </div>
                    ))
                  ) : (
                    <h3>{content.no_images}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </CustomTabs>
      </div>
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  content: state.content.page_content.gallery
});
const mapDispatchToProps = (dispatch) => ({
  getUserGallery: () => dispatch(getUserGalleryAction()),
  uploadImage: (type, image) => dispatch(uploadUserImagesAction(type, image)),
  deleteImage: (key, image) => dispatch(deleteImageAction(key, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
