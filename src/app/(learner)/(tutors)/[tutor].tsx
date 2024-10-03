import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { useCallback, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { TutorsInfo } from "~/components";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Tutor = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} opacity={0.7} />,
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    // handle index changes
  }, []);

  const renderHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.bottomSheetIndicator} />
    </View>
  );
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
    </View>
  );
};

export default Tutor;

const styles = StyleSheet.create({
  handleContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
