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
  return (
    <Tabs selectedIndex={selectedTab} onSelect={setSelectedTab}>
      <TabList className={`${s.tab__list} ${tabListClass}`}>
        {tabs.map((tab) => (
          <Tab
            key={`custom_tab${tab}`}
            className={`${s.tab} ${tabClass}`}
            selectedClassName={s.tab__active}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <TabPanel key={`tabpanel${i}`}>{child}</TabPanel>
        ))
      ) : (
        <TabPanel>{children}</TabPanel>
      )}
    </Tabs>
  );
};

CustomTabs.defaultProps = {
  tabs: [],
  children: [],
};

export default CustomTabs;
