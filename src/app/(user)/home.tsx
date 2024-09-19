import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <HeaderWithUsername />
      <Text>Home</Text>
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
