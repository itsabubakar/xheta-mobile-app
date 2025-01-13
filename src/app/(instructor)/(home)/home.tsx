import { format } from "date-fns";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import { Hero, InstructorClass, UpcomingClassSchedule } from "~/components";
import {
  getTutorDashBoard,
  getTutorMonthlyEarnings,
  getTutorUpcomingClasses,
} from "~/src/api/tutors-dashboard";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

const Home = () => {
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const [dashboardData, setDashboardData] = useState(null);
  const [upcomingClasses, setUpcomingClasses] = useState(null);
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  console.log(authData, "authData");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [dashboardRes, classesRes] = await Promise.all([
        getTutorDashBoard(accessToken),

        getTutorUpcomingClasses(accessToken, todayDate),
      ]);

      // Save data to state
      setDashboardData(dashboardRes);
      // Extract current month's earnings

      setUpcomingClasses(classesRes);

      console.log(dashboardRes, "dashboard res");
      console.log(classesRes, "classesRes res");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <HeaderWithUsername
        profileImage={authData?.profile_image}
        name={authData?.name}
      />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
      >
        <Hero dashboardData={dashboardData} />
        <UpcomingClassSchedule
          upcomingClasses={upcomingClasses}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </ScrollView>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
