import React from "react";
import { StyleSheet, View } from "react-native";

import Bootcamp from "./bootcamp";

const BootCampSection = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <Bootcamp />
      <Bootcamp />
      <Bootcamp />
      <Bootcamp />
      <Bootcamp />
      <Bootcamp />
    </View>
  );
};

export default BootCampSection;

const styles = StyleSheet.create({});
