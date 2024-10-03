import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current month
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Selected date

  // Generate days for the current month
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  // Calculate padding for the first week (offset)
  const firstDayOfMonth = getDay(startDate);

  // Navigate between months
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Format date
  const formattedMonth = format(currentDate, "MMMM yyyy");

  return (
    <View style={styles.container}>
      {/* Header for Month Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.month}>{formattedMonth}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Day Labels */}
      <View style={styles.weekDaysContainer}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates Grid */}
      <View style={styles.datesContainer}>
        {/* Add padding for first week */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <View key={index} style={styles.emptyDate} />
        ))}

        {/* Render days of the month */}
        {daysInMonth.map((date, index) => {
          const formattedDate = format(date, "d");
          const isSelected =
            selectedDate &&
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <TouchableOpacity
              key={index}
              style={[styles.date, isSelected ? styles.selectedDate : null]}
              onPress={() => {
                setSelectedDate(date);
                console.log("Selected Date:", format(date, "yyyy-MM-dd"));
              }}
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected ? styles.selectedDateText : null,
                ]}
              >
                {formattedDate}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Styles for the calendar component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  month: {
    fontSize: 18,
    fontWeight: "600",
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    color: "#888",
  },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
  },
  selectedDate: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
  },
  selectedDateText: {
    color: "white",
    fontWeight: "600",
  },
  emptyDate: {
    width: "14.28%",
    aspectRatio: 1,
  },
});

export default CustomCalendar;
