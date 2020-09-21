import React, { useEffect, useMemo, useState } from "react";
import s from "./EditSite.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import SiteSection from "../../misc/SiteSection/SiteSection";
import {
  createSiteAction,
  getSectionVariationsAction,
  getSingleTemplateAction,
} from "../../store/actions/siteActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import EditSiteSection from "../../misc/EditSiteSection/EditSiteSection";
import Button from "../../misc/Button/Button";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import InputFile from "../../misc/InputFile/InputFile";
import { uploadImageAction } from "../../store/actions/userActions";
import { FiRefreshCw } from "react-icons/all";
import { fetchRefreshedText } from "../../store/api/api";
import PhoneNumberInput from "../../misc/PhoneNumberinput/PhoneNumberInput";
import EditAdvantagesSection from "../../misc/EditAdvantagesSection/EditAdvantagesSection";
import EditServicesSection from "../../misc/EditServicesSection/EditServicesSection";
import { getEditingSiteAction } from "../../store/actions/siteActions";

const EditSite = ({
  getEditingSite,
  getSectionVariations,
  sectionsVariations,
  site,
}) => {
  const { id } = useParams();
  const [sectionsValues, setSectionsValues] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [editingState, setEditingState] = useState({
    section: {},
    isEditing: false,
  });
  const [baseData, setBaseData] = useState({
    organizationName: "",
    templateId: +id,
    phone: null,
    adress: "",
    logo: "elements/images/header_logo/2/ppp.png",
  });

  const onBaseInputChange = ({ target: { name, value } }) => {
    setBaseData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogoLoad = async ([image]) => {
    setBaseData((prev) => ({ ...prev, logo: image }));
  };

  const showEditingModal = (section) => {
    const { categoryID } = section;
    setEditingState({ section, isEditing: true });
    if (!sectionsVariations[categoryID]) {
      getSectionVariations(categoryID);
    }
  };

  const hideEditingModal = () => {
    setEditingState({ section: {}, isEditing: false });
  };

  const addSection = (section) => {
    setActiveSections((prev) => [...prev, section]);
  };

  const removeSection = (section) => {
    setActiveSections((prev) =>
      prev.filter(({ categoryID }) => categoryID !== section.categoryID)
    );
  };

  const setSectionVariation = (section, element) => {
    const changedSections = sectionsValues.map((sectionValue) => {
      return sectionValue.categoryID === section.categoryID
        ? {
            ...sectionValue,
            element: {
              ...element,
              parameters: sectionValue.element.parameters,
            },
          }
        : sectionValue;
    });
    setSectionsValues(changedSections);
  };

  const onEdit = (categoryID, key, value) => {
    const editedSection = sectionsValues.filter(
      (section) => section.categoryID === categoryID
    )[0];
    editedSection.element.parameters[key] = value;
    if (key === "reviews" || key === "reviewName") {
      const { reviews, reviewName } = editedSection.element.parameters;
      if (reviews?.length < reviewName?.length) {
        // eslint-disable-next-line no-unused-expressions
        reviewName?.forEach((_, i) => {
          if (!reviews[i]) {
            reviews[i] = "";
          }
        });
      } else if (reviews?.length > reviewName?.length) {
        // eslint-disable-next-line no-unused-expressions
        reviews?.forEach((_, i) => {
          if (!reviewName[i]) {
            reviewName[i] = "";
          }
        });
      }
    }
    setSectionsValues((prev) => [
      ...sectionsValues.map((section) =>
        section.categoryID !== categoryID ? section : editedSection
      ),
    ]);
  };

  const onRefreshBaseData = async (type) => {
    const response = await fetchRefreshedText(id, "ua", type);
    if (response?.status === 200) {
      const { desc } = response.data.text;
      setBaseData((prev) => ({ ...prev, [type]: desc }));
    }
  };

  const onSubmit = () => {
    // let headerIndex = null;
    // const menu = [];
    // const elements = sectionsValues
    //   .filter((sectionValues) => {
    //     return !!activeSections.filter(
    //       ({ categoryID }) => categoryID === sectionValues.categoryID
    //     )[0];
    //   })
    //   .map(({ element }, i) => {
    //     const { link, name } = element;
    //     console.log("element ===", element);
    //     if (Object.keys(element.parameters).includes("menu")) {
    //       headerIndex = i;
    //     }
    //     if (link) {
    //       menu.push({ link, name: element.parameters.section_name });
    //     }
    //     return element;
    //   });
    // elements[headerIndex].parameters.menu = menu;
    // createSite({ ...baseData, elements, phone: +baseData.phone });
  };

  useEffect(() => {
    console.log("site ===", site);
    if (!site.elements) return;
    const { elements } = site;
    const temp = elements.map((element) => {
      const parameters = {};
      element.categoryParameters.forEach(({ key, value }) => {
        parameters[key] = value;
      });
      return {
        ...element,
        element: { ...element.element, parameters },
      };
    });
    console.log("temp ===", temp);
    setSectionsValues(temp);
  }, [site]);

  useEffect(() => {
    console.log("sectionsValues ===", sectionsValues);
  }, [sectionsValues]);

  useEffect(() => {
    getEditingSite(id);
  }, []);

  const activeEditingValue = useMemo(() => {
    return sectionsValues.find((section) => {
      return section.categoryID === editingState.section.categoryID;
    });
  }, [sectionsValues, editingState]);

  const isAdvantagesEditing = activeEditingValue?.categoryName === "Переваги";
  const isServicesEditing = activeEditingValue?.categoryName === "Послуги";

  console.log("activeEditingValue ===", activeEditingValue);
  return (
    <FixedWrapper>
      {editingState.isEditing && !isAdvantagesEditing && !isServicesEditing && (
        <EditSiteSection
          values={activeEditingValue.element.parameters}
          hide={hideEditingModal}
          section={activeEditingValue}
          {...{ onEdit }}
          {...{ setSectionVariation }}
        />
      )}
      {editingState.isEditing && isAdvantagesEditing && (
        <EditAdvantagesSection
          hide={hideEditingModal}
          section={activeEditingValue}
          {...{ onEdit }}
          {...{ setSectionVariation }}
        />
      )}
      {editingState.isEditing && isServicesEditing && (
        <EditServicesSection
          hide={hideEditingModal}
          section={activeEditingValue}
          {...{ onEdit }}
          {...{ setSectionVariation }}
        />
      )}
      <h1 className={s.title}>Редагування сайту</h1>
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
              value={baseData.organizationName}
              name="organizationName"
              placeholder="Dent"
              onChange={onBaseInputChange}
              containerClass={s.input__container}
            >
              <FiRefreshCw
                onClick={() => onRefreshBaseData("organizationName")}
                className={s.refresh__icon}
              />
            </Input>
            <PhoneNumberInput
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
              placeholder="New York"
              onChange={onBaseInputChange}
              containerClass={s.input__container}
            />
            <InputFile label="Логотип" onChange={onLogoLoad} type="image" />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.sections}>
            {sectionsValues.map((section) => (
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
  site: state.site.editingSite,
  sectionsVariations: state.site.sectionsVariations,
});

const mapDispatchToProps = (dispatch) => ({
  getEditingSite: (id) => dispatch(getEditingSiteAction(id)),
  createSite: (siteData) => dispatch(createSiteAction(siteData)),
  uploadImage: (imageFormData) => dispatch(uploadImageAction(imageFormData)),
  getSectionVariations: (sectionId) =>
    dispatch(getSectionVariationsAction(sectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSite);
