import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { InstructorClass, Lesson, UpcomingClassSchedule } from "~/components";
import { ScreenHeaderWithTabs } from "~/src/ui";
import { Text } from "~/theme";

type Props = object;

const Lessons = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Classes");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  console.log(activeTab);
  return (
    <View style={styles.container}>
      <ScreenHeaderWithTabs
        tabs={["Classes", "Request"]}
        onTabChange={handleTabChange}
        title="Schedules"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
      >
        {activeTab === "Classes" ? (
          <>
            <UpcomingClassSchedule />
            <InstructorClass />
            <InstructorClass />
            <InstructorClass />
            <InstructorClass />
            <InstructorClass />
          </>
        ) : (
          <View>
            <Text style={{ marginTop: 24, marginBottom: 8 }} variant="md">
              Lesson request
            </Text>
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
