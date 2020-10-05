import React, { useEffect, useMemo, useState } from "react";
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
import { Formik } from "formik";
import Button from "../Button/Button";
import { createAdvantageAction } from "../../store/actions/siteActions";

const EditAdvantagesSection = ({
  section,
  setSectionVariation,
  hide,
  onEdit: saveState,
  sectionsVariations,
  createAdvantage,
}) => {
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

  const { benefitList: selectedAdvantages } = changingState;

  const benefitList = useMemo(() => {
    return section.categoryParameters.find(
      (parameter) => parameter.key === "benefitList"
    );
  }, [section]);

  const [selectedParentsIds, selectedAdvantagesIds] = useMemo(() => {
    const tempParentsIds = [];
    const tempChildrenIds = [];
    console.log("selected advantages ===", selectedAdvantages);
    if (selectedAdvantages?.length) {
      selectedAdvantages.forEach(({ id, children, parent_id: parentId }) => {
        tempParentsIds.push(parentId);
        tempChildrenIds.push(id);
      });
    }

    return [tempParentsIds, tempChildrenIds];
  }, [selectedAdvantages]);

  const onAdvantageCheckboxChange = (child, img, value) => {
    const { parent_id: parentId } = child;
    if (value && selectedParentsIds.includes(parentId)) {
      const temp = selectedAdvantages.filter((advantage) => {
        return advantage.parent_id !== parentId;
      });
      onEdit("benefitList", [...temp, { ...child, img }]);
      return;
    }

    if (!value) {
      const temp = selectedAdvantages.filter((advantage) => {
        return advantage.id !== child.id;
      });
      onEdit("benefitList", temp);
      return;
    }

    onEdit("benefitList", [
      ...selectedAdvantages,
      { ...child, img, parent_id: parentId },
    ]);
  };

  useEffect(() => {
    const { parameters } = section.element || {};
    if (parameters) {
      setChangingState(parameters);
    }
  }, [section]);

  console.log("changing state", changingState);
  console.log("selectedParentsIds", selectedParentsIds);
  console.log("selectedAdvantagesIds", selectedAdvantagesIds);
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
        {section.categoryParameters.map(({ name, type, id, key }) => {
          return (
            type === "text" && (
              <Input
                containerClass={s.field__container}
                value={changingState[key]}
                label={name}
                placeholder={name}
                key={id}
                onChange={({ target: { value } }) => {
                  onEdit(key, value);
                }}
              />
            )
          );
        })}
        <div className={s.section}>
          <Accordion allowZeroExpanded>
            {benefitList.value?.map((benefit) => {
              const { children, id, img } = benefit;
              return (
                <AccordionItem key={id}>
                  <AccordionItemHeading>
                    <AccordionItemButton className={s.benefit__title}>
                      {benefit.desc}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {children?.map((child) => (
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
                    <Formik
                      initialValues={{ name: "" }}
                      onSubmit={async (values, { resetForm }) => {
                        const benefit = await createAdvantage({
                          parent_id: id,
                          value: values.name,
                          lang: "ua",
                        });
                        onAdvantageCheckboxChange(benefit, img, true);
                        resetForm({ name: "" });
                      }}
                    >
                      {({ values, handleChange, handleSubmit }) => (
                        <div>
                          <Input
                            label="Назва переваги"
                            name="name"
                            placeholder="Привітний персонал"
                            onChange={handleChange}
                            value={values.name}
                            containerClass={s.field__container}
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
});
const mapDispatchToProps = (dispatch) => ({
  createAdvantage: (advantage) => dispatch(createAdvantageAction(advantage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAdvantagesSection);
