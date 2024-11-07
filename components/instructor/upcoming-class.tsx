import React from "react";
import { StyleSheet, View } from "react-native";

import DatePicker from "./date-picker";

import { Text } from "~/theme";

type Props = object;

const UpcomingClass = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Upcoming Class Schedule</Text>
      <DatePicker />
    </View>
  );
};

export default UpcomingClass;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
