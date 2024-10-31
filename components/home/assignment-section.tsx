import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Assignment from "./assignment";

import { noContent } from "~/assets/images";
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
        <Image source={noContent} />
        <Text
          style={{
            paddingTop: 16,
            textAlign: "center",
          }}
        >
          You have no assignments yet. Browse Courses...
        </Text>
        <Pressable onPress={() => router.push("/(courses)/courses")}>
          <Text
            variant="md"
            style={{
              color: theme.colors.primary,
            }}
          >
            Browse Courses
          </Text>
        </Pressable>
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
