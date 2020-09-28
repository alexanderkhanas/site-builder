import React, { useEffect, useState } from "react";
import s from "./CustomTabs.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const CustomTabs = ({
  tabs,
  children,
  selectedTab,
  setSelectedTab,
  tabListClass,
  tabClass,
}) => {
  useEffect(() => {
    if (!children) {
      console.error("You need to pass children (1 child - 1 tab panel)");
    }
  }, [children]);
  console.log("children ===", children);
  return (
    <Tabs {...{ selectedTab }} onSelect={setSelectedTab}>
      <TabList className={`${s.tab__list} ${tabListClass}`}>
        {tabs.map((tab) => (
          <Tab
            className={`${s.tab} ${tabClass}`}
            selectedClassName={s.tab__active}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {Array.isArray(children)
        ? children.map((child) => <TabPanel>{child}</TabPanel>)
        : [children].map((child) => <TabPanel>{child}</TabPanel>)}
    </Tabs>
  );
};

CustomTabs.defaultProps = {
  tabs: [],
  children: [],
};

export default CustomTabs;
