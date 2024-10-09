import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { LearningsModule, PaymentOption } from "~/components";
import LearningModule from "~/components/learnings/learning-module";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const LearningsDetail = (props: Props) => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Course details" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
        }}
      >
        <View style={styles.topics}>
          {/* Number */}
          <Text
            variant="subtitle"
            style={{ textAlign: "left", paddingBottom: 8, color: "#1D1D1D" }}
          >
            Lesson 01
          </Text>
          {/* Title */}
          <Text style={{ color: theme.colors.black }} variant="md">
            Introduction to UI/UX Design
          </Text>
          <LearningsModule completed />
          <LearningsModule completed />
          <LearningsModule completed />
        </View>
        <View style={styles.topics}>
          {/* Number */}
          <Text
            variant="md"
            style={{ textAlign: "left", paddingBottom: 8, color: "#1D1D1D" }}
          >
            Lesson 02
          </Text>
          {/* Title */}
          <Text style={{ color: theme.colors.black }} variant="md">
            User Research and Analysis
          </Text>
          <LearningsModule />
          <LearningsModule />
          <LearningsModule />
          <LearningsModule />
        </View>
      </ScrollView>
    </View>
  );
};

export default LearningsDetail;

const styles = StyleSheet.create({
  handleContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
  lottie: {
    width: 120,
    height: 120,
  },
  topics: {
    marginTop: 16,
  },
});
