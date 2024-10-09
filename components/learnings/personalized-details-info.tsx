import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Class, PencilIcon } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = object;

export const UpcomingClass = (props: Props) => {
  return (
    <View style={styles.detailsConc}>
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
      <Pressable
        style={{
          backgroundColor: "#CDD7D8",
          marginTop: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontFamily: "AeonikBold",

            paddingVertical: 8,
          }}
        >
          Join class
        </Text>
      </Pressable>
    </View>
  );
};

export const ScheduledClassTime = (props: Props) => {
  return (
    <View style={styles.detailsConc}>
      <View style={styles.container}>
        <Text variant="subtitle">Scheduled Class time</Text>
        <View
          style={{
            backgroundColor: "#CDD7D8",
            padding: 8,
            borderRadius: 12,
          }}
        >
          <PencilIcon />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: 16,
        }}
      >
        <View style={styles.infoContainer}>
          <Text
            style={{
              paddingBottom: 8,
            }}
          >
            Date
          </Text>
          <Text
            style={{
              backgroundColor: "#CDD7D8",
              textAlign: "center",
              padding: 8,
              borderRadius: 8,
            }}
          >
            20th April 2024
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              paddingBottom: 8,
            }}
          >
            Time
          </Text>
          <Text
            style={{
              backgroundColor: "#CDD7D8",

              padding: 8,
              borderRadius: 8,
            }}
          >
            7:00 AM
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  timer: { fontFamily: "AeonikMedium", fontSize: 10 },
  time: {
    fontFamily: "AeonikMedium",
    fontSize: 14,
    color: "#1D1D1D",
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    padding: 8,
    borderRadius: 8,
  },
  detailsConc: {
    borderColor: "#03363D",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoContainer: {
    flex: 1,
  },
});
