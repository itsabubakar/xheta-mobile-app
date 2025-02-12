import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  CircleX,
  CircularPlus,
  Mastercard,
  TrashIcon,
  UBA,
  Visacard,
} from "~/assets/icons";
import { noContent } from "~/assets/images";
import {
  addTutorSavedCard,
  deleteTutorSavedCard,
  getTutorSavedCards,
} from "~/src/api/tutor-payments";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeaderWithCustomIcon } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type Props = object;

const PaymentBilling = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [payments, setPayments] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [cardSave, setCardSave] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<any>({
    defaultValues: {
      card_holder_name: "",
      card_number: "",
      card_expiry_date: "",
      card_cvc: "",
      card_type: "",
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTutorSavedCards(accessToken);
      console.log(res.data);
      setPayments(res.data);
    } catch (error: any) {
      console.error("Error fetching data:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const checkCardType = (cardNumber: string) => {
    // Remove spaces and non-numeric characters
    cardNumber = cardNumber.replace(/\D/g, "");

    // Check for valid length
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return "Invalid card number length";
    }

    // Visa card: Starts with 4
    if (/^4/.test(cardNumber)) {
      return "Visa";
    }

    // MasterCard: Starts with 51-55 or 2221-2720
    if (
      /^5[1-5]/.test(cardNumber) ||
      /^22[2-9]/.test(cardNumber) ||
      /^2[3-6][0-9]/.test(cardNumber)
    ) {
      return "MasterCard";
    }

    // Verve card: Starts with 5061, 5062, 6500, 6501, or 6521 (common prefixes for Verve cards)
    if (/^5061|5062|6500|6501|6521/.test(cardNumber)) {
      return "Verve";
    }

    return "Unknown card type";
  };

  const handleCardSave = async (data: any) => {
    const payload = {
      card_holder_name: data.card_holder_name,
      card_number: data.card_number,
      card_expiry_date: data.card_expiry_date,
      card_cvc: data.card_cvc,
      card_type: checkCardType(data.card_number).toUpperCase(),
    };
    console.log(payload);
    setCardSave(true);
    try {
      const res = await addTutorSavedCard(accessToken, payload);
    } catch (error: any) {
      console.error(error);
    } finally {
      setCardSave(false);
      closeBottomSheet();
      fetchData();
    }
    console.log(data);
  };

  const deleteCard = async (id: string) => {
    console.log(id, "card id");
    try {
      const res = await deleteTutorSavedCard(accessToken, id);
    } catch (error: any) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: theme.colors.white,
        }}
      >
        <View>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeaderWithCustomIcon
        icon={<CircularPlus />}
        bg
        title="Payment"
        buttonFunction={openBottomSheet}
      />

      {/* {payments?.length === 0 && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image source={noContent} />
          <Text style={{ textAlign: "center", color: "#434343", marginTop: 8 }}>
            You don’t have any bank info yet
          </Text>
        </View>
      )} */}
      {/* {payments.length > 0 && ( */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Text style={{ marginBottom: 16, height: 20 }} variant="subtitle">
          Bank info
        </Text>
        <Bank />
        <Bank />
        <Bank />
      </ScrollView>
      {/* )} */}

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
        <BottomSheetScrollView style={styles.contentContainer}>
          <View style={styles.bottomSheetConc}>
            <Pressable
              onPress={closeBottomSheet}
              style={{
                alignItems: "flex-end",
                paddingRight: 16,
              }}
            >
              <CircleX />
            </Pressable>
            <View
              style={{
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ marginBottom: 8 }} variant="subtitle">
                Account details
              </Text>
              <Text style={{ marginBottom: 24 }}>
                Kindly enter your account details
              </Text>
              <ControlledInput
                control={control}
                name="card_holder_name"
                label="Account number"
                placeholder="Enter account number"
              />
              <ControlledInput
                control={control}
                name="card_number"
                label="Account name"
                placeholder="Enter account name"
              />
              <ControlledInput
                control={control}
                name="card_number"
                label="Bank name"
                placeholder="Select bank"
              />

              <Button
                loading={cardSave}
                disabled={cardSave}
                label="Save"
                onPress={handleSubmit(handleCardSave)}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const Bank = ({}: any) => {
  const formatCardNumber = (cardNumber: string) => {
    // Remove spaces and non-numeric characters
    cardNumber = cardNumber.replace(/\D/g, "");

    // Ensure card number is at least 4 digits long
    if (cardNumber.length < 4) {
      return "Invalid card number";
    }

    // Mask the first digits with Xs and show the last 4 digits
    const masked = "XXXX"; // Mask first part with 'XXXX'
    const last4 = cardNumber.slice(-4); // Get last 4 digits

    return `${masked}-${last4}`;
  };

  return (
    <View
      style={{
        marginBottom: 16,
        backgroundColor: "#F5F5F5",
        padding: 16,
        borderRadius: 16,
        flexDirection: "row",
      }}
    >
      <View style={{ justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16 }} variant="md">
          Xheta Humans
        </Text>
        <Text style={{ color: "#686868" }}>UBA</Text>
      </View>

      <View
        style={{ marginLeft: "auto", alignItems: "flex-end", paddingRight: 16 }}
      >
        <UBA />
        <Text style={{ paddingTop: 8 }}>0987654321</Text>
      </View>

      <View>
        <Pressable
          style={{ backgroundColor: "#fff", padding: 8, borderRadius: 999 }}
        >
          <TrashIcon color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentBilling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
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
  bottomSheetConc: {
    paddingBottom: 16,
  },
  dropDownView: {
    paddingTop: 16,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
