import React from "react";
import { StyleSheet, View } from "react-native";

import Assignment from "./assignment";

import { SectionHeader } from "~/src/ui";

type Props = object;

const AssignmentSection = (props: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader
        subheading="You have 2 pending assignment"
        title="Assignments"
        link="/"
      />

      <View style={styles.assignmentContainer}>
        <Assignment />
        <Assignment />
      </View>
    </View>
  );
};

export default AssignmentSection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },
  assignmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 16,
  },
});
