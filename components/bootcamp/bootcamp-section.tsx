import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Bootcamp from "./bootcamp";

const BootcampSection = ({ bootcamps }: any) => {
  return (
    <View style={styles.container}>
      {bootcamps.map((bootcamp: any) => (
        <Bootcamp key={bootcamp.id} bootcamp={bootcamp} />
      ))}
    </View>
  );
};

export default BootcampSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  bootcampCard: {
    width: "45%", // Adjust size to fit two items per row
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  bootcampTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
