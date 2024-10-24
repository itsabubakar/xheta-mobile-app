import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { greenTick } from "~/assets/animations";
import {
  Chevron,
  CircleX,
  FlutterWaveIcon,
  PayStackIcon,
  RoundBack,
  Stripecon,
  Xback,
} from "~/assets/icons";
import Paystack from "~/assets/icons/paystack";
import { CourseDetailHeader, CourseInfo, PaymentOption } from "~/components";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const CourseDetails = (props: Props) => {
  const courseDetails = useLocalSearchParams(); // Pulling the 'id' from the dynamic route

  console.log(courseDetails.id, "param");
  const [purchased, setPurchased] = useState(false);
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

  const handlePaymentClick = () => {
    // Simulate payment logic
    console.log("Payment option clicked!");
    // Update state to reflect purchase completion
    setPurchased(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Course details" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
        }}
      >
        <CourseDetailHeader info={courseDetails} />
        <CourseInfo />
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
          <Text variant="title">{courseDetails.course_price}</Text>
        </View>
        <View style={{ width: "50%" }}>
          <Button onPress={openBottomSheet} label="Enroll" />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // Open the sheet at the 50% snap point when rendered
        snapPoints={[1, "30%"]} // Change snap points based on step
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        enableDynamicSizing
      >
        <BottomSheetScrollView>
          {!purchased && (
            <>
              <Pressable
                onPress={closeBottomSheet}
                style={{
                  alignItems: "flex-end",
                  paddingRight: 12,
                }}
              >
                <CircleX />
              </Pressable>
              <View
                style={{
                  paddingHorizontal: 16,
                }}
              >
                <Text variant="normal_bold">Make Payment</Text>
              </View>
              <View
                style={{
                  padding: 16,
                }}
              >
                <Text>Select payment gateway</Text>

                <PaymentOption
                  onPress={handlePaymentClick}
                  text="Choose Paystack to pay in NGN"
                  option="Paystack"
                  icon={<PayStackIcon />}
                />
                <PaymentOption
                  onPress={() => console.log("boo")}
                  text="Choose Stripe to pay in USD"
                  option="Stripe"
                  icon={<Stripecon />}
                />
                <PaymentOption
                  onPress={() => console.log("boo")}
                  option="Flutterwave"
                  text="Choose Flutterwave to pay in NGN & USD"
                  icon={<FlutterWaveIcon />}
                />
              </View>
            </>
          )}

          {/* Purchase Confirmation Message */}
          {purchased && (
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <LottieView
                  style={styles.lottie}
                  source={greenTick}
                  autoPlay
                  loop
                />
              </View>
              <Text
                variant="subtitle"
                style={{ textAlign: "center", paddingBottom: 24 }}
              >
                Your have purchased this course successfully
              </Text>
              <Button onPress={closeBottomSheet} label="Dismiss" />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default CourseDetails;

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
