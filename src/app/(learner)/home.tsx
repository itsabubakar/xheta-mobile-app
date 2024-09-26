import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions } from "react-native";

import {
  AssignmentSection,
  CourseSection,
  HomeBottomSheet,
  InformationBoardSection,
} from "~/components";
import { useAuthStore } from "~/src/core/storage";
import { Button, HeaderWithUsername } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Home = (props: Props) => {
  const router = useRouter();
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const authData = useAuthStore((state) => state.authData);

  const handleLogout = async () => {
    await clearAuthData();
    // Optionally navigate to login or home screen after logout
    router.replace("/signin"); // Adjust the route as necessary
  };

  return (
    <View style={styles.container}>
      <HeaderWithUsername name={authData?.name} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CourseSection />
        <AssignmentSection />
        <InformationBoardSection />
        <Button label="Logout" onPress={handleLogout} />
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
