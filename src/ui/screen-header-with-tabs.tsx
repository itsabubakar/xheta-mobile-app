import React, { useState } from "react";
import { View, Pressable } from "react-native";

import { Text, theme } from "~/theme";

type Props = {
  title: string;
  tabs: string[]; // Props for tab labels
  onTabChange: (activeTab: string) => void; // Callback when tab changes
};

const ScreenHeaderWithTabs = ({ title, tabs, onTabChange }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent component of active tab change
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
      }}
    >
      <Text
        variant="lg"
        style={{
          color: theme.colors.white,
        }}
      >
        {title}
      </Text>

      {/* Tab Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 16,
          backgroundColor: theme.colors.white,
          borderRadius: 200,
          padding: 8,
          columnGap: 16,
        }}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                activeTab === tab
                  ? theme.colors.primary
                  : theme.colors.borderColor,
            }}
          >
            <Text
              variant="md"
              style={{
                textAlign: "center",
                color:
                  activeTab === tab
                    ? theme.colors.white
                    : theme.colors.lightBlack,
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ScreenHeaderWithTabs;
