import React, { useEffect, useState } from "react";
import s from "./CreateSite.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper";
import SiteSection from "../../misc/SiteSection/SiteSection";
import {
  createSiteAction,
  getSingleTemplateAction,
} from "../../store/actions/createSiteActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import EditSiteSection from "../../misc/EditSiteSection/EditSiteSection";
import Button from "../../misc/Button/Button";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import InputFile from "../../misc/InputFile/InputFile";

const CreateSite = ({ getSingleTemplate, sections, createSite }) => {
  const { id } = useParams();
  const [sectionsValues, setSectionsValues] = useState({});
  const [activeSections, setActiveSections] = useState([]);
  const [editingState, setEditingState] = useState({
    section: {},
    isEditing: false,
  });
  const [baseData, setBaseData] = useState({
    site_name: "",
    templateId: +id,
    phone: null,
    adress: "",
    logo: "elements/images/header_logo/2/ppp.png",
  });

  const onBaseInputChange = ({ target: { name, value } }) => {
    setBaseData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogoLoad = ([image]) => {
    setBaseData((prev) => ({ ...prev, logo: image }));
  };

  const showEditingModal = (section) => {
    setEditingState({ section, isEditing: true });
  };

  const hideEditingModal = () => {
    setEditingState({ section: {}, isEditing: false });
  };

  const addSection = (section) => {
    console.log("section ===", section.categoryParameters);
    setActiveSections((prev) => [...prev, section]);
  };

  const removeSection = (section) => {
    setActiveSections((prev) =>
      prev.filter(({ categoryID }) => categoryID !== section.categoryID)
    );
  };

  const onEdit = (categoryID, key, value) => {
    const section = sections.filter(
      (section) => section.categoryID === categoryID
    )[0];
    if (!section["element "][0].parameters) {
      section["element "][0].parameters = [{}];
    }
    section["element "][0].parameters[0][key] = value;
    setSectionsValues((prev) => [
      ...sections.filter((section) => section.categoryID !== categoryID),
      section,
    ]);

    console.log("section ===", section);
  };

  const onSubmit = () => {
    const elements = sectionsValues
      .filter((sectionValues) => {
        return !!activeSections.filter(
          ({ categoryID }) => categoryID === sectionValues.categoryID
        )[0];
      })
      .map((sectionValues) => {
        return sectionValues["element "][0];
      });
    console.log("elements ===", elements);
    createSite({ ...baseData, elements, phone: +baseData.phone });
  };

  useEffect(() => {
    getSingleTemplate(id);
  }, []);

  useEffect(() => {
    setSectionsValues(
      sections.map((section) => ({
        ...section,
        "element ": { ...section["element "], parameters: [{}] },
      }))
    );
  }, [sections]);

  useEffect(() => {
    console.log("sectionsValues ===", sectionsValues);
  }, [sectionsValues]);

  return (
    <FixedWrapper>
      {editingState.isEditing && (
        <EditSiteSection
          hide={hideEditingModal}
          section={editingState.section}
          {...{ onEdit }}
        />
      )}
      <h1 className={s.title}>Створення сайту</h1>
      <Tabs className={s.inner}>
        <TabList className={s.tab__list}>
          <Tab className={s.tab} selectedClassName={s.tab__active}>
            Базова інформація
          </Tab>
          <Tab className={s.tab} selectedClassName={s.tab__active}>
            Структура сайту
          </Tab>
        </TabList>
        <TabPanel>
          <div className={s.form}>
            <Input
              label="Назва сайту"
              value={baseData.site_name}
              name="site_name"
              onChange={onBaseInputChange}
              containerClass={s.input__container}
            />
            <Input
              label="Номер телефону"
              value={baseData.phone}
              name="phone"
              onChange={onBaseInputChange}
              containerClass={s.input__container}
            />
            <Input
              label="Адреса"
              value={baseData.adress}
              name="adress"
              onChange={onBaseInputChange}
              containerClass={s.input__container}
            />
            <InputFile label="Логотип" onChange={onLogoLoad} type="image" />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.sections}>
            {sections.map((section) => (
              <SiteSection
                isActive={
                  !!activeSections.filter(
                    ({ categoryID }) => categoryID === section.categoryID
                  )[0]
                }
                {...{ showEditingModal }}
                {...{ addSection }}
                {...{ removeSection }}
                {...{ section }}
                key={section.categoryID}
              />
            ))}
          </div>
          <Button size="lg" title="Створити" onClick={onSubmit} />
        </TabPanel>
      </Tabs>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({
  sections: state.createSite.sections,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleTemplate: (id) => dispatch(getSingleTemplateAction(id)),
  createSite: (siteData) => dispatch(createSiteAction(siteData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSite);
