import React, { useEffect, useState } from "react";
import s from "./SelectTemplate.module.css";
import Header from "../../misc/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TemplateCard from "../../misc/TemplateCard/TemplateCard";
import FixedWrapper from "../../wrappers/FixedWrapper";
import {
  getDirectionsAction,
  getSingleTemplateAction,
  getTemplatesAction,
} from "../../store/actions/createSiteActions";
import { connect } from "react-redux";
import classnames from "classnames";
import { useHistory } from "react-router";

const SelectTemplate = ({
  getDirections,
  getTemplates,
  getSingleTemplate,
  directions,
  templates,
}) => {
  const history = useHistory();
  const [selectedDirection, setSelectedDirection] = useState(
    templates[0] || {}
  );
  const onDirectionSelect = (direction) => {
    setSelectedDirection(direction);
  };

  useEffect(() => {
    const { id } = selectedDirection;
    if (id && !templates[id]) {
      getTemplates(id);
    }
  }, [directions, selectedDirection]);

  useEffect(() => {
    getDirections();
  }, []);

  useEffect(() => {
    setSelectedDirection(directions[0] || {});
  }, [directions]);

  console.log("templates ===", templates);
  return (
    <FixedWrapper>
      <div className={s.container}>
        <div className={s.tabs__container}>
          {directions.map((direction, i) => (
            <span
              className={classnames(s.tab, {
                [s.tab__active]: selectedDirection.id === direction.id,
              })}
              onClick={() => setSelectedDirection(direction)}
              key={direction.id}
            >
              {direction.name}
            </span>
          ))}
        </div>
        <div className={s.cards__container}>
          {templates[selectedDirection.id]?.map((template) => {
            const { id } = template;
            return (
              <TemplateCard
                onSubmit={() => history.push(`/create-site/${id}`)}
                {...{ template }}
                key={id}
              />
            );
          })}
        </div>
      </div>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({
  directions: state.createSite.directions,
  templates: state.createSite.templates,
});

const mapDispatchToProps = (dispatch) => ({
  getDirections: () => dispatch(getDirectionsAction()),
  getTemplates: (id) => dispatch(getTemplatesAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
