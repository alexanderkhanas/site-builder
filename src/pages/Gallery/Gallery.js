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
import { BiTrash } from "react-icons/all";
import Button from "../../misc/Button/Button";
import InputFile from "../../misc/InputFile/InputFile";

const Gallery = ({ deleteImage, uploadImage, getUserGallery, gallery }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const onImageLoad = (type, images) => {
    console.log("type ===", type);
    console.log("img ===", images);
    uploadImage(type, images);
  };

  useEffect(() => {
    getUserGallery().then(() => setLoading(false));
  }, []);

  return !isLoading ? (
    <FixedWrapper>
      <div className={s.container}>
        <CustomTabs
          tabListClass={s.tab__list}
          {...{ selectedTab }}
          {...{ setSelectedTab }}
          tabs={["Логотипи", "Основні", "Про нас", "Команда", "Портфоліо"]}
        >
          {[...Array(5)].map((_, i) => {
            const [key, images] = Object.entries(gallery)[i] || [];
            return images?.length ? (
              <div>
                <InputFile
                  onChange={(images) => onImageLoad(key, images)}
                  type="image"
                  multiple
                  accept="image/*"
                  withPreview={false}
                  containerClass={s.upload__input}
                />
                <div className={s.items__container}>
                  {images.map((img) => (
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
                  ))}
                </div>
              </div>
            ) : (
              <h3 key={`empty${i}`}>
                Ви ще не завантажили фото цієї категорії
              </h3>
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
});
const mapDispatchToProps = (dispatch) => ({
  getUserGallery: () => dispatch(getUserGalleryAction()),
  uploadImage: (type, image) => dispatch(uploadUserImagesAction(type, image)),
  deleteImage: (key, image) => dispatch(deleteImageAction(key, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
