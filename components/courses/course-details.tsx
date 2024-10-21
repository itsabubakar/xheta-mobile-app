import React from "react";
import { StyleSheet, View } from "react-native";

import CourseTopic from "./course-topic";

import { Text, theme } from "~/theme";

type Props = object;

const CourseInfo = (props: Props) => {
  return (
    <View
      style={{
        paddingTop: 24,
      }}
    >
      <Text
        style={{ paddingBottom: 4, color: theme.colors.black }}
        variant="subtitle"
      >
        Course details
      </Text>

      <View style={styles.topics}>
        {/* Number */}
        <Text variant="lg" style={{ textAlign: "right", paddingBottom: 8 }}>
          01
        </Text>
        {/* Title */}
        <Text style={{ color: theme.colors.black }} variant="md">
          Introduction to UI/UX Design
        </Text>
        <CourseTopic />
        <CourseTopic />
        <CourseTopic />
        <CourseTopic />
      </View>
      <View style={styles.topics}>
        {/* Number */}
        <Text variant="lg" style={{ textAlign: "right", paddingBottom: 8 }}>
          02
        </Text>
        {/* Title */}
        <Text style={{ color: theme.colors.black }} variant="md">
          User Research and Analysis
        </Text>
        <CourseTopic />
        <CourseTopic />
        <CourseTopic />
        <CourseTopic />
      </View>
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  topics: {
    marginTop: 16,
  },
});
