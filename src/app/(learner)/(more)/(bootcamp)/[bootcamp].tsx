import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { greenTick } from "~/assets/animations";
import {
  CircleX,
  FlutterWaveIcon,
  PayStackIcon,
  PlayIcon,
  Stripecon,
} from "~/assets/icons";
import { course } from "~/assets/images";
import { PaymentOption } from "~/components";
import { fetchOneBootcamp } from "~/src/api";
import { registerInterestForBootCamp } from "~/src/api/bootcamp";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const BootCampDetails = (props: Props) => {
  const { bootcamp: id }: any = useLocalSearchParams();

  const [purchased, setPurchased] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [bootcamp, setBootcamp] = useState() as any; // Store bootcamps
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!accessToken) return;
    if (!id) return;

    const fetchOneBootCampFromAPI = async () => {
      console.log("fetching", id);
      try {
        const response = await fetchOneBootcamp(accessToken, id);
        setBootcamp(response.data); // Save bootcamps to state
        console.log(response.data, "single bootcamp info");
      } catch (error) {
        console.error("Error fetching bootcamps:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchOneBootCampFromAPI();
  }, [accessToken]);
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

  const router = useRouter();
  // Handle button click

  const handlePayment = async (option: string) => {
    setLoading(true);

    try {
      const res = await registerInterestForBootCamp(
        accessToken || "",
        id,
        option,
      );
      // Route to WebView screen with the payment URL
      router.push({
        pathname: "/webview" as any,
        params: { url: res.authorization_url_for_making_payment },
      });
      console.log(res);
      setLoading(false);
      closeBottomSheet();
    } catch (error: any) {
      console.error(error.response.data);
      setLoading(false);
      closeBottomSheet();
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <ScreenHeader bg title="Course module" />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Container to handle layout */}
            <View style={styles.contentWrapper}>
              <View style={styles.content}>
                {/* Breadcrumb Section */}
                <Text variant="subtitle">Overview</Text>

                {/* Image with Play Button */}
                <View style={styles.imageContainer}>
                  <View style={styles.overlay} />
                  <Pressable
                    onPress={() => console.log("play button clicked")}
                    style={styles.playIconWrapper}
                  >
                    <PlayIcon />
                  </Pressable>
                  <Image style={styles.image} source={course} />
                </View>
                <Text style={styles.breadcrumb} variant="md">
                  {bootcamp?.title}
                </Text>

                {/* Notes Section */}
                <View style={styles.notesContainer}>
                  <Text variant="subtitle">Notes</Text>
                  <Text style={styles.notesText}> {bootcamp?.description}</Text>
                  <Text style={styles.notesText}>
                    Time:{" "}
                    <Text style={{ fontFamily: "AeonikBold" }}>
                      {bootcamp?.formatted_start_time} -{" "}
                      {bootcamp?.formatted_end_time}
                    </Text>
                  </Text>
                  <Text style={styles.notesText}>
                    Date:{" "}
                    <Text style={{ fontFamily: "AeonikBold" }}>
                      {bootcamp?.start_and_end_date}
                    </Text>
                  </Text>

                  <Text
                    style={{
                      paddingTop: 16,
                      fontFamily: "AeonikBold",
                      fontSize: 20,
                      color: "#1D1D1D",
                    }}
                  >
                    #{bootcamp?.price}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* Button at the bottom */}
          <View style={styles.buttonContainer}>
            <Button
              size="md"
              label="Register interest"
              onPress={openBottomSheet}
            />
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={0} // Open the sheet at the 50% snap point when rendered
            snapPoints={[1, "30%"]} // Change snap points based on step
            // onChange={handleSheetChanges}
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
                      onPress={() => handlePayment("PAYSTACK")}
                      text="Choose Paystack to pay in NGN"
                      option="Paystack"
                      icon={<PayStackIcon />}
                    />

                    <PaymentOption
                      onPress={() => handlePayment("FLUTTERWAVE")}
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
                    style={{
                      textAlign: "center",
                      paddingBottom: 24,
                      maxWidth: 250,
                      alignSelf: "center",
                    }}
                  >
                    Your have purchased this course successfully
                  </Text>
                  <Button onPress={closeBottomSheet} label="Dismiss" />
                </View>
              )}
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      )}
    </View>
  );
};

export default BootCampDetails;

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
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16, // To prevent content being cut off
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between", // Pushes content to the top and button to the bottom
    padding: 16,
  },
  content: {
    flexShrink: 1,
  },
  breadcrumb: {
    color: theme.colors.black,
    paddingBottom: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 5,
  },
  playIconWrapper: {
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
  },
  notesContainer: {
    paddingTop: 16,
  },
  notesText: {
    paddingTop: 8,
  },
  buttonContainer: {
    padding: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: "white",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, // Slightly increase opacity for a more visible effect
    shadowRadius: 8, // Reduce the radius for a more defined shadow
    // Shadow for Android
    elevation: 10,
  },
});
