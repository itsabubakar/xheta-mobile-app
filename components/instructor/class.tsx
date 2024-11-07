import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { UIUX } from "~/assets/icons";
import { Text } from "~/theme";

type Props = object;

const Class = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        borderColor: "#D2D2D266",
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#F5F5F5",
            padding: 12,
            borderRadius: 9999,
          }}
        >
          <UIUX />
        </View>
        <View>
          <Text style={{ color: "#686868", paddingBottom: 4 }}>
            10:00am - 12:00pm
          </Text>
          <Text variant="subtitle">Introduction to UI/UX design</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#CDD7D8",
          padding: 8,
          borderRadius: 12,
        }}
      >
        <Text style={{ textAlign: "center", fontFamily: "AeonikBold" }}>
          Start class
        </Text>
      </Pressable>
    </View>
  );
};

export default Class;

const styles = StyleSheet.create({});
