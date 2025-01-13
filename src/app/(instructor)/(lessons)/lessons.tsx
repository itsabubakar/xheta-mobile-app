import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

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

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  console.log(formattedDate, "selected date");

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getTutorUpcomingClasses(accessToken, formattedDate);
      setUpcomingClasses(res);
    } catch (error: any) {
      console.error("Error fetching data:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

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
            <UpcomingClassSchedule
              upcomingClasses={[]}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
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
