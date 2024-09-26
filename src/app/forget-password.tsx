import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, TextInput } from "react-native";

import { sendResetPasswordCode } from "../api/auth";
import { Button } from "../ui";
import { ControlledInput } from "../ui/form";

import { Text } from "~/theme";

type Props = object;

type FormData = {
  email: string;
  otp: string;
};

const ForgetPassword = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state

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

  const onSubmit = async (data: FormData) => {
    setLoading(true); // Start loading when form is submitted
    try {
      // Call the API to send reset password code
      const res = await sendResetPasswordCode(data.email.toLowerCase());
      console.log(res, "Reset password code sent successfully");

      // Pass the email as a query parameter to the OTP screen
      router.push({
        pathname: "/otp",
        params: { email: data.email.toLowerCase() }, // Pass email as param
      });
    } catch (error) {
      console.error("Failed to send reset password code:", error);
    } finally {
      setLoading(false); // Stop loading after the API call
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="title" style={styles.header}>
          Forgot password?
        </Text>
        <Text variant="subtitle" style={styles.subHeader}>
          We'll send a six-digit code to your email
        </Text>
      </View>

      <View>
        {/* Email Field */}
        <ControlledInput
          name="email"
          control={control}
          shadow
          label="Email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          }}
          placeholder="email@example.com"
          keyboardType="email-address"
        />
        {errors.email && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.email.message}
          </Text>
        )}
      </View>

      <View style={{ marginVertical: 32 }}>
        <Button
          label="Send Code" // Empty label if loading
          onPress={handleSubmit(onSubmit)}
          disabled={loading} // Disable button during loading
          loading={loading}
        />
      </View>

      <Button
        onPress={() => router.replace("/signin")}
        variant="link"
        label="Back to Sign In"
        fontFamily="AeonikMedium"
      />
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 26,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 24,
  },
});
