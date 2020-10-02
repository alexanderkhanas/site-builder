import React, { useEffect, useState } from "react";
import s from "./SelectTemplate.module.css";
import Header from "../../misc/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TemplateCard from "../../misc/TemplateCard/TemplateCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import {
  getDirectionsAction,
  getSingleTemplateAction,
  getTemplatesAction,
} from "../../store/actions/siteActions";
import { connect } from "react-redux";
import classnames from "classnames";
import { useHistory } from "react-router";
import FullPageLoader from "../../misc/FullPageLoader/FullPageLoader";

const SelectTemplate = ({
  getDirections,
  getTemplates,
  homeContent,
  directions,
  templates,
}) => {
  const history = useHistory();
  const [selectedDirection, setSelectedDirection] = useState(
    templates[0] || {}
  );
  const [isLoading, setLoading] = useState(false);

  // const onDirectionSelect = (direction) => {
  //   setSelectedDirection(direction);
  // };

  const { select, demo } = homeContent;

  useEffect(() => {
    const { id } = selectedDirection;
    if (id && !templates[id]) {
      setLoading(true);
      getTemplates(id).finally(() => setLoading(false));
    }
  }, [directions, selectedDirection]);

  useEffect(() => {
    setLoading(true);
    getDirections().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectedDirection(directions[0] || {});
  }, [directions]);

  return !isLoading ? (
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
              <div className={s.card__container}>
                <TemplateCard
                  selectText={select}
                  demoText={demo}
                  onSubmit={() => history.push(`/create-site/${id}`)}
                  {...{ template }}
                  key={id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({
  directions: state.site.directions,
  templates: state.site.templates,
  homeContent: state.content.page_content.home,
});

const mapDispatchToProps = (dispatch) => ({
  getDirections: () => dispatch(getDirectionsAction()),
  getTemplates: (id) => dispatch(getTemplatesAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
