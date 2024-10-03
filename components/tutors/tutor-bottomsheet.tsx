import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import LottieView from "lottie-react-native";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Pressable, StyleSheet } from "react-native";

import { CustomCalendar } from "../calendar";
import { PaymentOption } from "../payment";

import { greenTick } from "~/assets/animations";
import {
  Chevron,
  CircleX,
  FlutterWaveIcon,
  PayStackIcon,
  Stripecon,
} from "~/assets/icons";
import { Button } from "~/src/ui";
import { ControlledDropdown } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type PaymentBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
};

const PaymentBottomSheet = ({ bottomSheetRef }: PaymentBottomSheetProps) => {
  const { control } = useForm({});

  const [currentSection, setCurrentSection] = useState(4); // Track the current section

  const handleProceedToPayment = () => setCurrentSection(1);
  const handlePurchaseConfirmation = () => setCurrentSection(2);
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setCurrentSection(0);
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[1, "30%"]}
      enablePanDownToClose
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
    >
      <BottomSheetScrollView>
        {/* Section 1: Introduction Section */}
        {currentSection === 0 && (
          <View style={{ paddingHorizontal: 16 }}>
            <Text variant="subtitle">Book Tutor</Text>
            <View style={styles.dropDownView} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                columnGap: 16,
              }}
            >
              <View style={{ width: "50%", flex: 1 }}>
                <ControlledDropdown
                  name="to"
                  control={control}
                  rules={{ required: "Please select a time" }}
                  label="To"
                  options={[
                    { label: "7am", value: "7am" },
                    { label: "8am", value: "8am" },
                    { label: "9am", value: "9am" },
                  ]}
                />
              </View>
              <View style={{ width: "50%", flex: 1 }}>
                <ControlledDropdown
                  name="from"
                  control={control}
                  rules={{ required: "Please select a time" }}
                  label="From"
                  options={[
                    { label: "8am", value: "8am" },
                    { label: "9am", value: "9am" },
                    { label: "10am", value: "10am" },
                  ]}
                />
              </View>
            </View>

            <Button label="Proceed" onPress={() => setCurrentSection(1)} />
          </View>
        )}

        {/* Section 2: Payment Options Section */}
        {currentSection === 1 && (
          <>
            <Pressable
              onPress={closeBottomSheet}
              style={styles.closeIconWrapper}
            >
              <CircleX />
            </Pressable>
            <View style={styles.paymentSection}>
              <Text variant="normal_bold">Make Payment</Text>
              <Text>Select payment gateway</Text>

              <PaymentOption
                onPress={handlePurchaseConfirmation}
                text="Choose Paystack to pay in NGN"
                option="Paystack"
                icon={<PayStackIcon />}
              />
              <PaymentOption
                onPress={() => console.log("Stripe selected")}
                text="Choose Stripe to pay in USD"
                option="Stripe"
                icon={<Stripecon />}
              />
              <PaymentOption
                onPress={() => console.log("Flutterwave selected")}
                option="Flutterwave"
                text="Choose Flutterwave to pay in NGN & USD"
                icon={<FlutterWaveIcon />}
              />
            </View>
          </>
        )}

        {/* Section 3: Purchase Confirmation Section */}
        {currentSection === 2 && (
          <View style={styles.confirmationSection}>
            <View style={styles.lottieWrapper}>
              <LottieView
                style={styles.lottie}
                source={greenTick}
                autoPlay
                loop
              />
            </View>
            <Text variant="subtitle" style={styles.confirmationText}>
              You have purchased this course successfully
            </Text>
            <Button onPress={closeBottomSheet} label="Dismiss" />
          </View>
        )}

        {/* Section 4: Calendar Section */}
        {currentSection === 4 && (
          <View>
            <CustomCalendar />
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default PaymentBottomSheet;

const styles = StyleSheet.create({
  introSection: {
    padding: 16,
    alignItems: "center",
  },
  dropDownView: {
    paddingTop: 16,
  },
  paymentSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeIconWrapper: {
    alignItems: "flex-end",
    paddingRight: 12,
  },
  confirmationSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  lottieWrapper: {
    alignSelf: "center",
  },
  confirmationText: {
    textAlign: "center",
    paddingBottom: 24,
  },
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
