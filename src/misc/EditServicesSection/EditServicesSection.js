import React, { useMemo } from "react";
import s from "./EditServicesSection.module.css";
import { connect } from "react-redux";
import classnames from "classnames";
import Input from "../Input/Input";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Checkbox from "../Checkbox/Checkbox";
import InputFile from "../InputFile/InputFile";
import Button from "../Button/Button";
import { Formik } from "formik";
import { createServiceAction } from "../../store/actions/siteActions";
import { ReactComponent as FaTimes } from "../../assets/times.svg";

const EditServicesSection = ({
  sectionsVariations,
  section,
  setSectionVariation,
  hide,
  onEdit,
  createService,
}) => {
  const { element } = section;

  const servicesList = useMemo(() => {
    return section.categoryParameters.find(({ key }) => key === "servicesList");
  }, [section]);

  const {
    servicesList: selectedServices,
    section_name: sectionName,
  } = section.element.parameters;

  const [selectedParentsIds, selectedChildrenIds] = useMemo(() => {
    const tempParentsIds = [];
    const tempChildrenIds = [];
    if (selectedServices?.length) {
      selectedServices.forEach(({ id, children }) => {
        tempParentsIds.push(id);
        children.forEach((child) => {
          tempChildrenIds.push(child.id);
        });
      });
    }

    return [tempParentsIds, tempChildrenIds];
  }, [selectedServices]);

  const onParentSelected = (parent, isSelected) => {
    if (!isSelected) {
      const filtered = selectedServices.filter((service) => {
        return service.id !== parent.id;
      });
      onEdit(section.categoryID, "servicesList", filtered);
      return;
    }
    onEdit(section.categoryID, "servicesList", [...selectedServices, parent]);
  };

  const removeChild = (parent, child) => {
    const parentCopy = { ...parent };
    parentCopy.children = parent.children.filter((selectedChild) => {
      return selectedChild.id !== child.id;
    });
    let changedServices = [];
    if (!parentCopy.children.length) {
      changedServices = selectedServices.filter((selectedParent) => {
        return selectedParent.id !== parent.id;
      });
    } else {
      changedServices = selectedServices.map((service) => {
        return service.id === parent.id ? parentCopy : service;
      });
    }

    onEdit(section.categoryID, "servicesList", changedServices);
  };

  const addChild = (parent, child) => {
    parent.children.push(child);
    const changedServices = selectedServices.map((service) => {
      return service.id === parent.id ? parent : service;
    });
    onEdit(section.categoryID, "servicesList", changedServices);
  };

  const addParent = (parent, children = []) => {
    onEdit(section.categoryID, "servicesList", [
      ...selectedServices,
      {
        ...parent,
        children,
      },
    ]);
  };

  const onChildSelected = (child, parent, isSelected) => {
    const selectedParent = selectedServices.find((service) => {
      return service.id === parent.id;
    });
    if (selectedParent && isSelected) {
      addChild(selectedParent, child);
    } else if (selectedParent && !isSelected) {
      removeChild(selectedParent, child);
    } else {
      addParent(parent, [child]);
    }
  };

  const onChildPriceChange = (child, parentId, price) => {
    const selectedParent = selectedServices.find((service) => {
      return service.id === parentId;
    });
    selectedParent.children = selectedParent.children.map((selectedChild) => {
      return selectedChild.id === child.id
        ? { ...child, price }
        : selectedChild;
    });
    const changedServices = selectedServices.map((service) => {
      return service.id === parentId ? selectedParent : service;
    });
    onEdit(section.categoryID, "servicesList", changedServices);
  };

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
        {section.categoryParameters.map(({ name, type, id, value, key }) => {
          const inputProps = {
            containerClass: s.field__container,
            label: name,
            placeholder: name,
            onChange: ({ target: { value } }) => {
              onEdit(section.categoryID, key, value);
            },
            key: id,
          };
          if (type === "pdfFile") {
            return (
              <InputFile
                {...inputProps}
                onChange={(value) => {
                  onEdit(section.categoryID, key, value);
                }}
              />
            );
          }
          if (type === "text") {
            return <Input {...inputProps} value={element.parameters[key]} />;
          }
          return <div />;
        })}
        <div className={s.section}>
          <Accordion allowZeroExpanded>
            {servicesList.value.map((parent) => {
              const { children, id, img } = parent;
              return (
                <AccordionItem key={id} style={{ position: "relative" }}>
                  <AccordionItemHeading>
                    <AccordionItemButton className={s.service__title}>
                      {parent.desc}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <Checkbox
                    checked={selectedParentsIds.includes(id)}
                    onChange={({ target: { checked } }) => {
                      onParentSelected(parent, checked);
                    }}
                    containerClass={s.parent__checkbox}
                    id={`${id}-parent-checkbox`}
                  />
                  <AccordionItemPanel>
                    {children.map((child) => (
                      <div className={s.service__child}>
                        <div className={s.service__child__row}>
                          <p>{child.desc}</p>
                          <Checkbox
                            checked={selectedChildrenIds.includes(child.id)}
                            onChange={({ target: { checked } }) => {
                              onChildSelected(child, parent, checked);
                            }}
                            id={`${child.id}checkbox`}
                          />
                        </div>
                        <Input
                          placeholder="Ціна послуги (не обов'язково)"
                          containerClass={s.service__input}
                          value={child.price}
                          onChange={({ target: { value } }) => {
                            onChildPriceChange(child, id, value);
                          }}
                        />
                      </div>
                    ))}
                    <Formik
                      initialValues={{ name: "" }}
                      onSubmit={async (values, { resetForm }) => {
                        await createService({
                          parent_id: parent.id,
                          value: values.name,
                          lang: "ua",
                        });
                        resetForm({ name: "" });
                      }}
                    >
                      {({ values, handleChange, handleSubmit }) => (
                        <div>
                          <Input
                            label="Назва послуги"
                            name="name"
                            placeholder="Послуга"
                            onChange={handleChange}
                            containerClass={s.field__container}
                            value={values.name}
                          />
                          <Button title="Додати" onClick={handleSubmit} />
                        </div>
                      )}
                    </Formik>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
      <div className={s.overlay} onClick={hide} />
    </>
  );
};

const mapStateToProps = (state) => ({
  sectionsVariations: state.site.sectionsVariations,
});
const mapDispatchToProps = (dispatch) => ({
  createService: (service) => dispatch(createServiceAction(service)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditServicesSection);
