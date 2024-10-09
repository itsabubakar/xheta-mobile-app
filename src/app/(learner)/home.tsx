import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  AssignmentSection,
  CourseSection,
  HomeBottomSheet,
  InformationBoardSection,
} from "~/components";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Home = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);

  return (
    <View style={styles.container}>
      <HeaderWithUsername name={authData?.name} />
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
