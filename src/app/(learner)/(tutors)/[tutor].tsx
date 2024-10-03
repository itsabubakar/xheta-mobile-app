import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { View, ScrollView } from "react-native";

import { TutorsBottomSheet, TutorsInfo } from "~/components";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Tutor = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Tutor's details" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
        }}
      >
        <TutorsInfo />
      </ScrollView>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          backgroundColor: "white",
          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2, // Slightly increase opacity for a more visible effect
          shadowRadius: 8, // Reduce the radius for a more defined shadow
          // Shadow for Android
          elevation: 10, // Adjust the elevation to mimic the shadow's spread
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: theme.colors.black,
            }}
          >
            Price
          </Text>
          <Text variant="title">
            #500
            <Text
              style={{
                fontFamily: "AeonikNormal",
                fontSize: 20,
              }}
            >
              /hr
            </Text>
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Button onPress={openBottomSheet} label="Book tutor" />
        </View>
      </View>
      <TutorsBottomSheet bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

export default Tutor;
