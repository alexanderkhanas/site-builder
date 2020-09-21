import React, { useMemo, useState } from "react";
import s from "./EditAdvantagesSection.module.css";
import { connect } from "react-redux";
import classnames from "classnames";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

const EditAdvantagesSection = ({
  section,
  setSectionVariation,
  onAdvantageSelected,
  hide,
  onEdit,
  values,
  sectionsVariations,
}) => {
  const {
    benefitList: selectedAdvantages,
    section_name: sectionName,
  } = section.element.parameters;

  const benefitList = useMemo(() => {
    return section.categoryParameters.find(
      (parameter) => parameter.key === "benefitList"
    );
  }, [section]);

  const selectedAdvantagesIds = useMemo(() => {
    return selectedAdvantages.map((advantage) => advantage.id);
  }, [selectedAdvantages]);

  const selectedParentsIds = useMemo(() => {
    return selectedAdvantages.map((advantage) => advantage.parent_id);
  }, [selectedAdvantages]);

  const onAdvantageCheckboxChange = (child, img, value) => {
    const { parent_id: parentId } = child;
    if (value && selectedParentsIds.includes(parentId)) {
      const temp = selectedAdvantages.filter((advantage) => {
        return advantage.parent_id !== parentId;
      });
      onEdit(section.categoryID, "benefitList", [...temp, { ...child, img }]);
      return;
    }

    if (!value) {
      const temp = selectedAdvantages.filter((advantage) => {
        return advantage.id !== child.id;
      });
      onEdit(section.categoryID, "benefitList", temp);
      return;
    }

    onEdit(section.categoryID, "benefitList", [
      ...selectedAdvantages,
      { ...child, img, parentId },
    ]);
  };
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
        {section.categoryParameters.map(({ name, type, id }) => {
          return (
            type === "text" && (
              <Input
                containerClass={s.field__container}
                value={sectionName}
                label={name}
                placeholder={name}
                key={id}
                onChange={({ target: { value } }) => {
                  onEdit(section.categoryID, "section_name", value);
                }}
              />
            )
          );
        })}
        <div className={s.section}>
          <Accordion allowZeroExpanded>
            {benefitList.value.map((benefit) => {
              const { children, id, img } = benefit;
              return (
                <AccordionItem key={id}>
                  <AccordionItemHeading>
                    <AccordionItemButton className={s.benefit__title}>
                      {benefit.desc}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {children.map((child) => (
                      <div className={s.benefit__child}>
                        <div className={s.benefit__child__row}>
                          <p>{child.desc}</p>
                          <Checkbox
                            checked={selectedAdvantagesIds.includes(child.id)}
                            onChange={({ target: { checked } }) => {
                              onAdvantageCheckboxChange(child, img, checked);
                            }}
                            id={`${child.id}checkbox`}
                          />
                        </div>
                      </div>
                    ))}
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
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAdvantagesSection);
