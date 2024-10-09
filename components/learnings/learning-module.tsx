import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ClockIcon, SmallGreenTick } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  completed?: boolean;
};

const LearningModule = ({ completed }: Props) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(learner)/(learnings)/module-details")}
      style={styles.module}
    >
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
        {completed ? (
          <SmallGreenTick />
        ) : (
          <>
            <ClockIcon />
            <Text style={styles.timeText}>45 minutes</Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default LearningModule;

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
