import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  subDays,
  addDays,
  isBefore,
} from "date-fns";
import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

import { Chevron } from "~/assets/icons";
import { Text, theme } from "~/theme";

interface Props {
  setPickedDate: Dispatch<SetStateAction<Date | null>>;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
  pickedDate?: Date | null;
}

const CustomCalendar = ({
  setPickedDate,
  setShowCalendar,
  pickedDate,
}: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current month
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    pickedDate || null,
  ); // Selected date
  const today = new Date(); // Today's date

  // Generate days for the current month
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  // Calculate padding for the first week (previous month's days)
  const firstDayOfMonth = (getDay(startDate) + 6) % 7; // Adjust to start week from Monday
  const previousMonthDays = Array.from({ length: firstDayOfMonth }).map(
    (_, index) => subDays(startDate, firstDayOfMonth - index),
  );

  // Calculate remaining days to fill the last row (next month's days)
  const totalDisplayedDays = firstDayOfMonth + daysInMonth.length;
  const remainingDays =
    totalDisplayedDays % 7 === 0 ? 0 : 7 - (totalDisplayedDays % 7);
  const nextMonthDays = Array.from({ length: remainingDays }).map((_, index) =>
    addDays(endDate, index + 1),
  );

  // Navigate between months
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Extract formatted month and year separately
  const formattedMonth = format(currentDate, "MMMM");
  const formattedYear = format(currentDate, "yyyy");

  console.log(selectedDate);

  return (
    <View style={styles.container}>
      {/* Header for Month Navigation */}
      <View style={styles.header}>
        <Pressable onPress={goToPreviousMonth}>
          <View
            style={{
              transform: [{ rotate: "90deg" }],
              backgroundColor: "#F5F5F5",
              padding: 9,
              borderRadius: 12,
            }}
          >
            <Chevron />
          </View>
        </Pressable>
        <View style={styles.monthYearContainer}>
          <Text style={styles.month}>{formattedMonth}</Text>
          <Text style={styles.year}>{formattedYear}</Text>
        </View>
        <Pressable onPress={goToNextMonth}>
          <View
            style={{
              transform: [{ rotate: "-90deg" }],
              backgroundColor: "#F5F5F5",
              padding: 9,
              borderRadius: 12,
            }}
          >
            <Chevron />
          </View>
        </Pressable>
      </View>

      {/* Day Labels */}
      <View style={styles.weekDaysContainer}>
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates Grid */}
      <View style={styles.datesContainer}>
        {/* Render previous month's days */}
        {previousMonthDays.map((date, index) => (
          <View key={`prev-${index}`} style={styles.date}>
            <Text style={styles.inactiveDateText}>{format(date, "d")}</Text>
          </View>
        ))}

        {/* Render current month's days */}
        {daysInMonth.map((date, index) => {
          const formattedDate = format(date, "d");
          const isSelected =
            selectedDate &&
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          const isPastDate = isBefore(date, today);

          return (
            <Pressable
              key={index}
              style={[
                styles.date,
                isSelected ? styles.selectedDate : null,
                isPastDate ? styles.pastDate : null,
              ]}
              onPress={() => {
                if (!isPastDate) {
                  setSelectedDate(date);
                  setPickedDate(date); // Set picked date
                  setShowCalendar(false); // Hide calendar
                }
              }} // Disable click for past dates
              disabled={isPastDate} // Disable interaction for past dates
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected ? styles.selectedDateText : null,
                  isPastDate ? styles.pastDateText : null,
                ]}
              >
                {formattedDate}
              </Text>
            </Pressable>
          );
        })}

        {/* Render next month's days */}
        {nextMonthDays.map((date, index) => (
          <View key={`next-${index}`} style={styles.date}>
            <Text style={styles.inactiveDateText}>{format(date, "d")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles for the calendar component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYearContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  month: {
    fontSize: 18,
    fontFamily: "AeonikMedium",
    color: "#434343",
    marginRight: 8, // Spacing between month and year
  },
  year: {
    fontSize: 16,
    color: "#8E8E8E",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    paddingHorizontal: 35,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    color: "#8E8E8E",
  },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    alignItems: "flex-start",
  },
  date: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
  },
  selectedDate: {
    // borderRadius: 12,
  },
  selectedDateText: {
    color: "white",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
  pastDate: {
    // backgroundColor: "#f2f2f2", // Light background for past dates
  },
  pastDateText: {
    color: "#aaa", // Grayed-out text for past dates
  },
  inactiveDateText: {
    color: "#ccc", // Light gray for inactive days (previous and next month)
  },
});

export default CustomCalendar;
