import { Feather } from "@expo/vector-icons";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import React, { useState } from "react";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";

import { Text, theme } from "~/theme";

const HorizontalDatePicker = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(today, { weekStartsOn: 0 }),
  );

  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek((nextWeek) => addDays(nextWeek, 7));
  };

  const renderWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeek, i);
      const isSelected =
        format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

      weekDays.push(
        <Pressable
          key={i}
          onPress={() => setSelectedDate(day)}
          style={styles.dayContainer}
        >
          <Text style={styles.dayAbbrev}>{format(day, "EEE")}</Text>
          <Text
            style={[styles.dayNumber, isSelected && styles.selectedDayNumber]}
          >
            {format(day, "d")}
          </Text>
        </Pressable>,
      );
    }
    return weekDays;
  };

  // Split currentWeekRange into dateRange and year parts
  const dateRange = `${format(currentWeek, "MMMM d")} - ${format(
    endOfWeek(currentWeek, { weekStartsOn: 0 }),
    "d",
  )}`;
  const year = format(currentWeek, "yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={{
            backgroundColor: "#E7F2F3",
            padding: 9,
            borderRadius: 12,
          }}
          onPress={handlePreviousWeek}
        >
          <Feather name="chevron-left" size={16} color="#3F434A" />
        </Pressable>
        <View style={styles.dateHeader}>
          <Text style={styles.weekRangeText}>{dateRange}</Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#E7F2F3",
            padding: 9,
            borderRadius: 12,
          }}
          onPress={handleNextWeek}
        >
          <Feather name="chevron-right" size={16} color="#3F434A" />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekContainer}
      >
        {renderWeekDays()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  dateHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  weekRangeText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary,
    fontFamily: "AeonikMedium",
  },
  yearText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#686868",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 8,
  },
  dayContainer: {
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  dayAbbrev: {
    fontSize: 16,
    color: "#686868",
    marginBottom: 16,
    flex: 1,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    padding: 12,
  },
  selectedDayNumber: {
    backgroundColor: theme.colors.primary,
    color: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});

export default HorizontalDatePicker;
