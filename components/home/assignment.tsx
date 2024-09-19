import React from "react";
import { StyleSheet, View } from "react-native";

import { Python } from "~/assets/icons";
import { Text, useTheme } from "~/theme";

type Props = object;

const Assignment = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View
        style={{
          backgroundColor: "white",
          width: 41,
          height: 41,
          borderWidth: 2,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Python />
      </View>
      <Text
        style={{ color: "white", paddingTop: 8, paddingBottom: 4 }}
        variant="subtitle"
      >
        Introduction to Python
      </Text>
      <Text style={{ color: "white" }}>
        Lorem ipsum dolor sit amet consectetur. Eget ac massa ...
      </Text>
    </View>
  );
};

export default Assignment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
});
