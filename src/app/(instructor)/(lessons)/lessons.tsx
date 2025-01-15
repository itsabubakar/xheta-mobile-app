import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import Classes from "./classes";
import Request from "./request";

import { InstructorClass, Lesson, UpcomingClassSchedule } from "~/components";
import { getTutorUpcomingClasses } from "~/src/api/tutors-dashboard";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithTabs } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Lessons = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Classes");
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [upcomingClasses, setUpcomingClasses] = useState(null);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
            <Classes />
          </>
        ) : (
          <>
            <Request />
          </>
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
