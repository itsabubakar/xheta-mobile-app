import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, TextInput } from "react-native";

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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(""); // State to store OTP

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

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const sendCode = (data: FormData) => {
    console.log("Code sent to:", data.email);
    setOtpSent(true);
  };

  const handleOtpChange = (text: string) => {
    // Only allow numeric characters and limit length to 6
    if (/^\d{0,6}$/.test(text)) {
      setOtp(text);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="title" style={styles.header}>
          Forgot password?
        </Text>
        <Text variant="subtitle" style={styles.subHeader}>
          {otpSent
            ? "Enter the six-digit code sent to your email"
            : "We'll send a six-digit code to your email"}
        </Text>
      </View>

      {!otpSent ? (
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
      ) : (
        <View style={styles.otpContainer}>
          {/* OTP TextInput */}
          <TextInput
            style={styles.hiddenOtpInput}
            value={otp}
            onChangeText={handleOtpChange}
            keyboardType="numeric"
            maxLength={6}
          />
          <View style={styles.otpBoxes}>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpBoxText}>{otp[index] || ""}</Text>
                </View>
              ))}
          </View>
        </View>
      )}

      <View style={{ marginVertical: 32 }}>
        <Button
          label={otpSent ? "Verify Code" : "Send Code"}
          onPress={handleSubmit(otpSent ? onSubmit : sendCode)}
        />
      </View>

      <Button
        onPress={() => router.push("/signin")}
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
  otpContainer: {
    marginBottom: 32,
  },
  hiddenOtpInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  otpBoxes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 50,
  },
  otpBoxText: {
    fontSize: 18,
  },
});
