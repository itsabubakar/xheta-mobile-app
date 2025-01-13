import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

import Class from "./class";
import DatePicker from "./date-picker";

import { noContent } from "~/assets/images";
import { Text } from "~/theme";

const UpcomingClass = ({
  selectedDate,
  setSelectedDate,
  upcomingClasses,
}: any) => {
  const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format the date for API call

  useEffect(() => {
    console.log(`Date changed to: ${formattedDate}`); // Trigger actions when date changes
  }, [formattedDate]);

  return (
    <View style={styles.container}>
      <Text>Upcoming Class Schedule</Text>

      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {upcomingClasses?.length === 0 && (
        <View style={{ alignItems: "center" }}>
          <Image source={noContent} />
          <Text style={{ textAlign: "center", color: "#434343", marginTop: 8 }}>
            You don’t have any upcoming classes yet
          </Text>
        </View>
      )}
      {upcomingClasses?.map((item: any) => <Class key={item.id} />)}
    </View>
  );
};

export default UpcomingClass;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
