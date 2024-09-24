import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import {
  AssignmentSection,
  CourseSection,
  HomeBottomSheet,
  InformationBoardSection,
} from "~/components";
import { Button, HeaderWithUsername } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <HeaderWithUsername />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CourseSection />
        <AssignmentSection />
        <InformationBoardSection />
      </ScrollView>
      <HomeBottomSheet />

      <StatusBar style="light" backgroundColor={theme.colors.primary} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
});
