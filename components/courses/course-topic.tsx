import React from "react";
import { StyleSheet, View } from "react-native";

import { ClockIcon } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = object;

const CourseTopic = (props: Props) => {
  return (
    <View style={styles.module}>
      <View style={styles.info}>
        {/* subtitle */}
        <Text style={styles.moduleTitle}>
          Understanding UI/UX Design Principles
        </Text>
        {/* lesson number */}
        <Text style={styles.lesson}>Lesson 01</Text>
      </View>
      {/* Time */}
      <View style={styles.time}>
        <ClockIcon />
        <Text style={styles.timeText}>45 minutes</Text>
      </View>
    </View>
  );
};

export default CourseTopic;

const styles = StyleSheet.create({
  module: {
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  info: { maxWidth: 205 },
  moduleTitle: {
    fontSize: 12,
    fontFamily: "AeonikMedium",
    borderRadius: 8,
    color: theme.colors.black,
  },
  lesson: {
    paddingTop: 2,
    color: "#686868",
    fontSize: 12,
  },

  time: {
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    columnGap: 4,
    alignSelf: "center",
  },
  timeText: {
    marginTop: 2,
    color: "#59595A",
    fontSize: 12,
  },
});
