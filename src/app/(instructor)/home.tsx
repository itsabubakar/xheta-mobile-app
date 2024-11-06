import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { Hero, UpcomingClassSchedule } from "~/components";
import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderWithUsername profileImage={undefined} name="John Doe" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
      >
        <Hero />
        <UpcomingClassSchedule />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
