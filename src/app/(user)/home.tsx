import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  AssignmentSection,
  CourseSection,
  InformationBoardSection,
} from "~/components";
import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

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
});
