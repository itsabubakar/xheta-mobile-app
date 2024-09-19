import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = object;

const Notifications = (props: Props) => {
  return (
    <View>
      <Text>Notifications</Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
