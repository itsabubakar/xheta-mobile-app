import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenHeader } from "../ui";

type Props = object;

const Notifications = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications" />
      <Text>Notifications</Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
