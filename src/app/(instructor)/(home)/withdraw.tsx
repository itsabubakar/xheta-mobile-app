import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

import { UBA } from "~/assets/icons";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type Props = object;

type FormData = {
  email?: string;
  otp?: string;
};

const Withdraw = (props: Props) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });
  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallet" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              marginBottom: 24,
              color: "white",
            }}
          >
            Available balance
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "AeonikBold",
              }}
            >
              #50,000
            </Text>
          </View>
        </View>

        <Text style={{ fontFamily: "AeonikMedium" }}>Withdraw</Text>
        <View style={{ marginTop: 16 }}>
          <View style={styles.formView}>
            <ControlledInput
              name="email"
              control={control}
              shadow
              label="Enter amount"
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid amount ",
                },
              }}
              placeholder="10000"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={styles.formView}>
            <ControlledInput
              name="email"
              control={control}
              shadow
              label="Account number"
              rules={{
                required: "Account number is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid account number ",
                },
              }}
              placeholder="10000"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={styles.formView}>
            <ControlledInput
              name="email"
              control={control}
              shadow
              label="Bank name"
              rules={{
                required: "Bank name is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a bank name ",
                },
              }}
              placeholder="10000"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              marginVertical: 16,
            }}
          >
            Select saved account
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#F5F5F5",
              padding: 16,
              borderRadius: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "AonikMedium",
                  fontSize: 16,
                  paddingBottom: 4,
                }}
              >
                Shanon Wills
              </Text>
              <Text>United Bank of Africa</Text>
            </View>
            <View>
              <UBA />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
          }}
        >
          <Button label="Proceed" onPress={() => router.push("/otp")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  formView: {},
});
