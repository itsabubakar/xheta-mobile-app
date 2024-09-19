import React from "react";
import { StyleSheet, View } from "react-native";

import Course from "./course";

import { SectionHeader } from "~/src/ui";

type Props = object;

const CourseSection = (props: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Course progress" link="/" />
      <Course />
      <Course />
      <Course />
    </View>
  );
};

export default CourseSection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },
});
