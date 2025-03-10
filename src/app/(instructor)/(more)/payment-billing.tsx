import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { CircleX, CircularPlus } from "~/assets/icons";
import { addTutorBankInfo, getTutorBankInfo } from "~/src/api/tutor-payments";
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

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: {
      account_number: "",
      account_name: "",
      bank_name: "",
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTutorBankInfo(accessToken);

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

  const handleCardSave = async (data: any) => {
    const payload = {
      account_number: data.account_number,
      account_name: data.account_name,
      bank_name: data.bank_name,
    };
    try {
      const res = await addTutorBankInfo(accessToken, payload);
      console.log(res, "response");
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      closeBottomSheet();
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Text style={{ marginBottom: 16, height: 20 }} variant="subtitle">
          Bank info
        </Text>
        <Bank payments={payments} />
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
                name="account_number"
                label="Account number"
                placeholder="Enter account number"
              />
              <ControlledInput
                control={control}
                name="account_name"
                label="Account name"
                placeholder="Enter account name"
              />
              <ControlledInput
                control={control}
                name="bank_name"
                label="Bank name"
                placeholder="Select bank"
              />

              <Button
                loading={isSubmitting}
                disabled={isSubmitting}
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

const Bank = ({ payments }: any) => {
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
          {payments.account_name}
        </Text>
        <Text style={{ color: "#686868" }}> {payments.bank_name}</Text>
      </View>

      <View
        style={{ marginLeft: "auto", alignItems: "flex-end", paddingRight: 16 }}
      >
        {/* <UBA /> */}
        <Text style={{ paddingTop: 8 }}> {payments.account_number}</Text>
      </View>

      {/* <View>
        <Pressable
          style={{ backgroundColor: "#fff", padding: 8, borderRadius: 999 }}
        >
          <TrashIcon color="black" />
        </Pressable>
      </View> */}
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
