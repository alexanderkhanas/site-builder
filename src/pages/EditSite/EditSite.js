import React, { useEffect, useMemo, useState } from "react";
import s from "./EditSite.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import SiteSection from "../../misc/SiteSection/SiteSection";
import {
  createSiteAction,
  editSiteAction,
  getSectionVariationsAction,
  getSingleTemplateAction,
  getEditingSiteAction,
} from "../../store/actions/siteActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import EditSiteSection from "../../misc/EditSiteSection/EditSiteSection";
import Button from "../../misc/Button/Button";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import InputFile from "../../misc/InputFile/InputFile";
import { uploadImageAction } from "../../store/actions/userActions";
import { FaCogs, FiRefreshCw } from "react-icons/all";
import { fetchRefreshedText } from "../../store/api/api";
import PhoneNumberInput from "../../misc/PhoneNumberinput/PhoneNumberInput";
import EditAdvantagesSection from "../../misc/EditAdvantagesSection/EditAdvantagesSection";
import EditServicesSection from "../../misc/EditServicesSection/EditServicesSection";
import Login from "../Login/Login";
import DraggableSections from "../../misc/DraggableSections/DraggableSections";

const EditSite = ({
  getEditingSite,
  getSectionVariations,
  sectionsVariations,
  site,
  editSite,
}) => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [sectionsValues, setSectionsValues] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [editingState, setEditingState] = useState({
    section: {},
    isEditing: false,
  });
  const [baseData, setBaseData] = useState({
    organizationName: "",
    siteId: +id,
    phone: null,
    adress: "",
    logo: "elements/images/header_logo/2/ppp.png",
    templateId: null,
  });

  const onDragEnd = ({ source, destination }) => {
    const tempArray = [...sectionsValues];
    const foundValue = tempArray[source.index];
    tempArray.splice(source.index, 1);
    tempArray.splice(destination.index, 0, foundValue);
    setSectionsValues(tempArray);
  };

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
    let headerIndex = null;
    const menu = [];
    const elements = sectionsValues
      .filter((sectionValues) => {
        return !!activeSections.filter(
          ({ categoryID }) => categoryID === sectionValues.categoryID
        )[0];
      })
      .map(({ element }, i) => {
        const { link, name } = element;
        if (Object.keys(element.parameters).includes("menu")) {
          headerIndex = i;
        }
        if (link) {
          menu.push({ link, name: element.parameters.section_name });
        }
        return element;
      });
    elements[headerIndex].parameters.menu = menu;
    editSite({ ...baseData, elements, phone: +baseData.phone });
  };

  useEffect(() => {
    const { elements, templateName, templateId } = site;
    if (!site.elements) return;
    setBaseData((prev) => ({
      ...prev,
      organizationName: templateName,
      templateId,
    }));
    const tempActiveSections = [];
    const temp = elements.map((section) => {
      const { element, categoryParameters } = section;
      const parameters = {};
      section.categoryParameters.forEach(({ key, value }) => {
        parameters[key] = value;
      });
      if (element.type === "selected" || element.type === "required") {
        tempActiveSections.push(section);
      }
      return {
        ...section,
        id: `${Math.random()} ${new Date().getTime()}`,
        element: { ...element, parameters },
      };
    });
    setActiveSections(tempActiveSections);
    setSectionsValues(temp);
  }, [site]);

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
      <Tabs
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}
        className={s.inner}
      >
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
            <InputFile
              label="Логотип"
              containerClass={s.input__container}
              onChange={onLogoLoad}
              type="image"
            />
            <Button
              onClick={() => setSelectedTab(1)}
              title="Розширені налаштування"
            >
              <FaCogs className={s.button__icon} />
            </Button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.sections}>
            <SiteSection
              isActive
              {...{ showEditingModal }}
              {...{ addSection }}
              {...{ removeSection }}
              section={sectionsValues[0]}
            />

            <DraggableSections
              sections={sectionsValues.slice(1, sectionsValues.length - 1)}
              {...{ showEditingModal }}
              {...{ addSection }}
              {...{ removeSection }}
              {...{ onDragEnd }}
              {...{ activeSections }}
            />
            <SiteSection
              isActive
              {...{ showEditingModal }}
              {...{ addSection }}
              {...{ removeSection }}
              section={sectionsValues[sectionsValues.length - 1]}
            />
          </div>
        </TabPanel>
        <Button
          size="lg"
          title="Змінити"
          className={s.submit__button}
          onClick={onSubmit}
        />
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
  editSite: (siteData) => dispatch(editSiteAction(siteData)),
  uploadImage: (imageFormData) => dispatch(uploadImageAction(imageFormData)),
  getSectionVariations: (sectionId) =>
    dispatch(getSectionVariationsAction(sectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSite);
