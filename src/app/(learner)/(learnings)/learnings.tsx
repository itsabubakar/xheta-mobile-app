import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { LearningsSection } from "~/components";
import { ScreenHeaderWithTabs } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Learnings = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Ongoing");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScreenHeaderWithTabs
        tabs={["Ongoing", "Completed"]}
        onTabChange={handleTabChange}
        title="Learnings"
      />
      {/* Content based on active tab */}
      <LearningsSection activeTab={activeTab} />
    </View>
  );
};

export default Learnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
