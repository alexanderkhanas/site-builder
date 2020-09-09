import React from "react";
import s from "./SelectTemplate.module.css";
import Header from "../../misc/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TemplateCard from "../../misc/TemplateCard/TemplateCard";
import FixedWrapper from "../../wrappers/FixedWrapper";

const SelectTemplate = () => {
  return (
    <FixedWrapper>
      <div className={s.container}>
        <Tabs>
          <TabList className={s.tabs__container}>
            {["Стоматологія", "СТО", "Лікарі", "IT"].map((item) => (
              <Tab
                className={s.tab}
                selectedClassName={s.tab__active}
                key={item}
              >
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanel className={s.cards__container}>
            {[...Array(4)].map((_, i) => (
              <TemplateCard key={i} title="title" desc="desc" />
            ))}
          </TabPanel>
          <TabPanel className={s.cards__container}>
            {[...Array(3)].map((_, i) => (
              <TemplateCard key={i} title="title" desc="desc" />
            ))}
          </TabPanel>
          <TabPanel className={s.cards__container}>
            {[...Array(5)].map((_, i) => (
              <TemplateCard key={i} title="title" desc="desc" />
            ))}
          </TabPanel>
        </Tabs>
      </div>
    </FixedWrapper>
  );
};

export default SelectTemplate;
