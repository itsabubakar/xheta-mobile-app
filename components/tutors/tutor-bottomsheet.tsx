import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Pressable, StyleSheet, ActivityIndicator } from "react-native";

import { CustomCalendar } from "../calendar";
import { PaymentOption } from "../payment";

import { greenTick } from "~/assets/animations";
import {
  CalenderIcon,
  CircleX,
  FlutterWaveIcon,
  PayStackIcon,
} from "~/assets/icons";
import { bookTutor, makePaymentToBookTutor } from "~/src/api/tutors";
import { useAuthStore } from "~/src/core/storage";
import { Button } from "~/src/ui";
import { ControlledDropdown, ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type PaymentBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  tutorId: string;
};

const PaymentBottomSheet = ({
  bottomSheetRef,
  tutorId,
}: PaymentBottomSheetProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      from: "",
      to: "",
      message: "",
    },
  });

  const [currentSection, setCurrentSection] = useState(0); // Track the current section
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [bookingIdentifier, setBookingIdentifier] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);

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

  const bookTutorTime = async (data: any) => {
    setLoading(true);
    reset();
    setPickedDate(null);
    const { from, message, to } = data;

    const pickedDate = new Date();
    // Dynamically detect the user's time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert pickedDate to "YYYY-MM-DD" format
    const formattedDate = format(pickedDate, "yyyy-MM-dd");

    const dataToSubmit = {
      start_time: from,
      end_time: to,
      message_from_learner: message,
      date: formattedDate, // formatted date
      time_zone: userTimeZone,
      tutor_id: tutorId,
    };

    try {
      const res = await bookTutor(accessToken, dataToSubmit);
      console.log(res);
      setBookingIdentifier(res.booking_identifier);
      setLoading(false);
      setCurrentSection(1);
    } catch (error: any) {
      console.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handlePayment = async (option: string) => {
    console.log(bookingIdentifier);
    setLoading(true);

    try {
      const res = await makePaymentToBookTutor(
        accessToken,
        bookingIdentifier,
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
    } catch (error) {
      console.error(error);
      setLoading(false);
      closeBottomSheet();
    }
  };

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
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      <BottomSheetScrollView>
        {/* Section 1: Introduction Section */}
        {!loading && currentSection === 0 && (
          <View style={{ paddingHorizontal: 16 }}>
            {showCalendar ? (
              <CustomCalendar
                pickedDate={pickedDate}
                setPickedDate={setPickedDate}
                setShowCalendar={setShowCalendar}
              />
            ) : (
              <>
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
                      name="from"
                      control={control}
                      rules={{ required: "Please select a time" }}
                      label="From"
                      options={[
                        { label: "7am", value: "07:00" },
                        { label: "8am", value: "08:00" },
                        { label: "9am", value: "09:00" },
                      ]}
                    />
                  </View>
                  <View style={{ width: "50%", flex: 1 }}>
                    <ControlledDropdown
                      name="to"
                      control={control}
                      rules={{ required: "Please select a time" }}
                      label="To"
                      options={[
                        { label: "8am", value: "08:00m" },
                        { label: "9am", value: "09:00" },
                        { label: "10am", value: "10:00" },
                      ]}
                    />
                  </View>
                </View>

                {/* Date Picker Button */}
                <View>
                  <Text style={styles.datePickerLabel}>Date</Text>
                  <Pressable
                    onPress={() => {
                      setShowCalendar(true); // Show the calendar
                    }}
                    style={styles.datePicker}
                  >
                    <Text style={styles.selectedDate}>
                      {pickedDate ? pickedDate.toDateString() : "Nil"}
                    </Text>
                    {/* Add your calendar icon here */}
                    <View
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <CalenderIcon />
                    </View>
                  </Pressable>
                </View>
                <ControlledTextArea
                  control={control}
                  name="message"
                  label="Message"
                  placeholder="Enter a short description..."
                />
                <View
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Button
                    label="Proceed"
                    onPress={handleSubmit(bookTutorTime)}
                  />
                </View>
              </>
            )}
          </View>
        )}

        {/* Section 2: Payment Options Section */}
        {!loading && currentSection === 1 && (
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
            <Text
              variant="subtitle"
              style={[styles.confirmationText, { paddingBottom: 4 }]}
            >
              Learning slot booked successfully
            </Text>
            <Text style={styles.confirmationText}>
              Your tutor will be notified, upon accepting you will also get
              notified.
            </Text>
            <View
              style={{
                width: "100%",
                paddingTop: 24,
              }}
            >
              <Button onPress={closeBottomSheet} label="Dismiss" />
            </View>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default PaymentBottomSheet;

const styles = StyleSheet.create({
  datePicker: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.lightGray,

    // Shadow for iOS
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Elevation for Android
    elevation: 1,
  },
  datePickerLabel: {
    color: "#344054",
    fontFamily: "AeonikMedium",
    marginBottom: 6, // Add spacing from previous elements
  },
  selectedDate: {
    flex: 1, // Make this take available space
  },
  calendarIcon: {
    marginLeft: 8, // Space between date text and icon
  },

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
