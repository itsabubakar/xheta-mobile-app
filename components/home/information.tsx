import React from "react";
import { StyleSheet, View } from "react-native";

import { Class } from "~/assets/icons";
import { Text } from "~/theme";

type Props = object;

const Information = (props: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          width: 48,
          height: 48,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Class />
      </View>

      <Text style={{ fontFamily: "AeonikMedium", flex: 1 }}>
        You have a class with Rick Desmond
      </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <View style={{ marginLeft: "auto" }}>
          <Text style={styles.timer}>Hr.</Text>
          <Text style={styles.time}>04</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ marginTop: 20, marginHorizontal: 4 }}>:</Text>
        </View>
        <View>
          <Text style={styles.timer}>Min.</Text>
          <Text style={styles.time}>00</Text>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Text
            style={{
              fontFamily: "AeonikMedium",
              marginBottom: 4,
              marginLeft: 6,
            }}
          >
            PM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderColor: "#03363D",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  timer: { fontFamily: "AeonikMedium", fontSize: 10 },
  time: {
    fontFamily: "AeonikMedium",
    fontSize: 14,
    color: "#1D1D1D",
    borderWidth: 1,
    borderColor: "#F7F7F9",
    padding: 8,
    borderRadius: 8,
  },
});
