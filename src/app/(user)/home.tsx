import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import {
  AssignmentSection,
  CourseSection,
  InformationBoardSection,
} from "~/components";
import { Button, HeaderWithUsername } from "~/src/ui";
import { Text, theme } from "~/theme";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { xhetaBanner } from "~/assets/images";
import { CircleX } from "~/assets/icons";

const { width: screenWidth } = Dimensions.get("window");

type Props = object;

const Home = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} opacity={0.7} />,
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.bottomSheetIndicator} />
    </View>
  );

  // Calculate the image width maintaining the aspect ratio
  const imageWidth = screenWidth * 0.9; // 90% of screen width
  const imageHeight = (imageWidth * 156) / 343; // Maintain aspect ratio

  return (
    <View style={styles.container}>
      <HeaderWithUsername />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CourseSection />
        <AssignmentSection />
        <Button label="Open Sheet" onPress={openBottomSheet} />
        <InformationBoardSection />
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[1, "30%", "50%"]}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Image
            source={xhetaBanner}
            style={{
              width: imageWidth,
              height: imageHeight,
              alignSelf: "center",
            }}
          />
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}
          >
            <Text variant="subtitle" style={{ textAlign: "center" }}>
              Welcome to your dashboard
            </Text>
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              We’re glad to have you onboard. Kindly follow this process to
              complete your profile set up.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16 }}
          >
            <Button variant="outline" label="Skip" width={"48%"} />
            <Button width={"48%"} label="Proceed" fontFamily="AeonikMedium" />
          </View>
        </BottomSheetView>
      </BottomSheet>

      <StatusBar style="light" backgroundColor={theme.colors.primary} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    right: 10,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
});
