import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UpcomingClassSchedule } from "~/components";
import { getTutorUpcomingClasses } from "~/src/api/tutors-dashboard";
import { useAuthStore } from "~/src/core/storage";
import { theme } from "~/theme";

type Props = object;

const Classes = (props: any) => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [upcomingClasses, setUpcomingClasses] = useState(null);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(true);
  const accessToken = authData?.access_token || "";

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

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
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            marginTop: 200,
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }
  return (
    <>
      <UpcomingClassSchedule
        upcomingClasses={[]}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default Classes;

const styles = StyleSheet.create({});
