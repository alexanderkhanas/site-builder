import React from "react";
import s from "./ImageSectionPicker.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import classnames from "classnames";

const ImageSectionPicker = ({
  userImages,
  adminImages,
  onSelect,
  activeImages = [],
}) => {
  return (
    (!!userImages.length || !!adminImages.length) && (
      <Tabs>
        <TabList className={s.tab__list}>
          <Tab className={s.tab} selectedClassName={s.tab__active}>
            Завантажені
          </Tab>
          <Tab className={s.tab} selectedClassName={s.tab__active}>
            Інші варіанти
          </Tab>
        </TabList>
        <TabPanel className={s.tab__panel}>
          {userImages.map((img) => {
            return (
              <img
                onClick={() => onSelect(img, activeImages.includes(img))}
                key={img}
                alt="loading"
                src={`https://topfractal.com/${img}`}
                className={classnames(s.image, {
                  [s.image__active]: activeImages.includes(img),
                })}
              />
            );
          })}
          {!userImages.length && (
            <p className={s.empty__text}>Немає завантажених зображень</p>
          )}
        </TabPanel>
        <TabPanel className={classnames(s.tab__panel, s.images__tab__panel)}>
          {adminImages.map((img) => {
            return (
              <img
                onClick={() => onSelect(img, activeImages.includes(img))}
                key={img}
                alt="loading"
                src={`https://topfractal.com/${img}`}
                className={classnames(s.image, {
                  [s.image__active]: activeImages.includes(img),
                })}
              />
            );
          })}
        </TabPanel>
      </Tabs>
    )
  );
};

ImageSectionPicker.defaultProps = {
  userImages: [],
  adminImages: [],
};

export default ImageSectionPicker;
