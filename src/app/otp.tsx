import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator, // For loading state
} from "react-native";

import { sendResetPasswordCode, verifyOTPCode } from "../api/auth";
import { Button } from "../ui";
import { OTPInput } from "../ui/form";

import { Text, useTheme } from "~/theme";

type FormData = {
  otp: string;
};

const OTP = () => {
  const theme = useTheme();
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(false); // Resend button state
  const [counter, setCounter] = useState(60);

  let { email } = useLocalSearchParams();
  if (Array.isArray(email)) {
    email = email[0]; // Ensure it's a string
  }

  if (!email || typeof email !== "string") {
    // Handle missing or invalid email case
    console.error("Invalid email parameter");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
  });
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false); // Loading state
  const [apiError, setApiError] = useState<string | null>(null); // API error state
  const [errorMessages, setErrorMessages] = useState<string[]>();

  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const config = {
    backgroundColor: theme.colors.white,
    textColor: "#686868",
    borderColor: "#B4B4B4",
    errorColor: theme.colors.error,
    focusColor: theme.colors.focus,
  };

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split("");
      setCodes(newCodes);
      refs[5]!.current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);
    if (text !== "" && index < 5) {
      refs[index + 1]!.current?.focus();
    }
  };

  const onSubmit = async () => {
    setLoading(true); // Start loading
    setApiError(null); // Reset any previous error
    const otpCode = codes.join(""); // Join the codes array to form the OTP string

    try {
      console.log("Submitting");

      const response = await verifyOTPCode(otpCode);

      // If successful, navigate to the next screen
      router.replace({
        pathname: "/reset-password",
        params: { token: response.token }, // Pass token as param
      });
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setApiError("Invalid OTP. Please try again."); // Set the error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onResendSubmit = async () => {
    setResendDisabled(true);
    try {
      // Call the API to send reset password code
      const res = await sendResetPasswordCode(email);
      console.log(res, "Reset password code sent successfully");
    } catch (error) {
      console.error("Failed to send reset password code:", error);
    } finally {
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (resendDisabled && counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setResendDisabled(false);
      setCounter(60); // Reset counter
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendDisabled, counter]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: 16,
      }}
    >
      <View>
        <Text variant="title" style={styles.header}>
          Enter OTP
        </Text>
        <Text variant="subtitle" style={styles.subHeader}>
          Enter the six-digit code sent to your email
        </Text>
      </View>

      <OTPInput
        codes={codes}
        errorMessages={errorMessages}
        onChangeCode={onChangeCode}
        refs={refs}
        config={config}
      />

      {apiError && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
          {apiError}
        </Text>
      )}

      <View style={{ marginVertical: 32 }}>
        <Button
          label="Verify" // Show loading spinner if loading
          onPress={handleSubmit(onSubmit)}
          disabled={loading} // Disable the button while loading
          loading={loading}
        />
      </View>

      <Button
        onPress={onResendSubmit}
        variant="link"
        label={`Didn’t receive code? Resend ${resendDisabled ? `in ${counter}s` : ""}`}
        disabled={resendDisabled}
        fontFamily="AeonikMedium"
      />
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
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
