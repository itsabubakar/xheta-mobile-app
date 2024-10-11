import React from "react";
import { Image, ScrollView, View } from "react-native";

import { DownloadIcon } from "~/assets/icons";
import { certificate } from "~/assets/images";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Accomplisment = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader bg title="Accomplishment" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <Text variant="subtitle">Completed courses</Text>
        <View style={{ rowGap: 16, marginTop: 8 }}>
          <AccomplishmentCard />
          <AccomplishmentCard />
          <AccomplishmentCard />
          <AccomplishmentCard />
          <AccomplishmentCard />
        </View>
      </ScrollView>
    </View>
  );
};

const AccomplishmentCard = () => {
  return (
    <View
      style={{
        borderColor: theme.colors.borderColor,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text variant="md">Web Design Fundamentals</Text>
        <Text style={{ fontFamily: "AeonikMedium", fontSize: 12 }}>
          Completed May 20, 2024
        </Text>
        <Text style={{ fontFamily: "AeonikMedium", fontSize: 12 }}>
          Grade: 100%
        </Text>
      </View>
      <View>
        <Image
          style={{ width: 60, height: 48, alignSelf: "flex-end" }}
          source={certificate}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
        >
          <DownloadIcon />
          <Text style={{ fontFamily: "AeonikMedium", color: "#102A2D" }}>
            Download
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Accomplisment;
