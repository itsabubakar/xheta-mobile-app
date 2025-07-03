import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Assignment from "./assignment";

import { imgOne, noContent } from "~/assets/images";
import { SectionHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const AssignmentSection = (props: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader
        // subheading="You have 2 pending assignment"
        title="Assignments"
        link="/"
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={imgOne} />
        <Text
          style={{
            paddingTop: 16,
            textAlign: "center",
          }}
        >
          Assignments will appear here.
        </Text>
      </View>

      {/* <View style={styles.assignmentContainer}>
        <Assignment />
        <Assignment />
      </View> */}
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
