import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { greenTick } from "~/assets/animations";
import { CircleX, FlutterWaveIcon, PayStackIcon } from "~/assets/icons";
import { CourseDetailHeader, CourseInfo, PaymentOption } from "~/components";
import { enrollForACourse } from "~/src/api/courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const CourseDetails = (props: Props) => {
  const router = useRouter();
  const courseDetails: any = useLocalSearchParams(); // Pulling the 'id' from the dynamic route
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";

  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handlePaymentClick = async (option: string) => {
    setLoading(true);
    try {
      const res = await enrollForACourse(accessToken, courseDetails.id, option);

      // Route to WebView screen with the payment URL
      router.push({
        pathname: "/webview" as any,
        params: { url: res.authorization_url_for_making_payment },
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.response?.data || error.message);
    }
  };

  // Show spinner while loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

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
                  onPress={() => handlePaymentClick("PAYSTACK")}
                  text="Choose Paystack to pay in NGN"
                  option="Paystack"
                  icon={<PayStackIcon />}
                />

                <PaymentOption
                  onPress={() => handlePaymentClick("FLUTTERWAVE")}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
