import React from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";

import { Text, theme } from "~/theme";

type Props = object;

const Course = ({ course }: any) => {
  const percentage = course.course_progress;

  // Function to get color that transitions from green to red
  // Function to transition from red to orange to green based on percentage
  const getColor = (percentage: number) => {
    if (percentage < 50) {
      // Transition from red to orange
      const red = 255;
      const green = Math.floor((percentage / 50) * 165); // Ranges from 0 to 165
      return `rgb(${red}, ${green}, 0)`; // From red to orange
    } else {
      // Transition from orange to green
      const red = Math.floor(255 - ((percentage - 50) / 50) * 255); // Ranges from 255 to 0
      const green = 165 + Math.floor(((percentage - 50) / 50) * 90); // Ranges from 165 to 255
      return `rgb(${red}, ${green}, 0)`; // From orange to green
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: theme.colors.primary, paddingBottom: 4 }}
            variant="subtitle"
          >
            {course.course_name}
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {" "}
            {course.course_description}
          </Text>
        </View>
        {/* Circular Progress Bar */}
        <Progress.Circle
          size={45}
          progress={percentage / 100}
          showsText
          formatText={() => `${percentage}%`}
          color={getColor(percentage)}
          thickness={5}
          strokeCap="round"
          unfilledColor="#e6e6e6"
          borderColor="none"
          textStyle={{ color: "black" }}
        />
      </View>
    </>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
    padding: 16,
    columnGap: 16,
    marginBottom: 16,
  },
});
