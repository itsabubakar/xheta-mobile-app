import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

import { noContent } from "~/assets/images";
import { DatePicker, Lesson } from "~/components";
import { getTutorBookedClasses } from "~/src/api/tutor-schedule";
import { useAuthStore } from "~/src/core/storage";
import { Text, theme } from "~/theme";

type Props = object;

const Request = (props: Props) => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [bookedClasses, setBookedClasses] = useState([]);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(true);
  const accessToken = authData?.access_token || "";

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getTutorBookedClasses(accessToken, formattedDate);
      setBookedClasses(res);
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
    <View>
      <Text style={{ marginTop: 24, marginBottom: 8 }} variant="md">
        Lesson request
      </Text>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {bookedClasses?.length === 0 && (
        <View style={{ alignItems: "center" }}>
          <Image source={noContent} />
          <Text style={{ textAlign: "center", color: "#434343", marginTop: 8 }}>
            You don’t have any booked classes yet
          </Text>
        </View>
      )}
      {bookedClasses?.map((item: any) => <Lesson key={item.id} />)}
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({});
