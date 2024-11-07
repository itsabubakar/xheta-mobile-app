import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import type { RefObject } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { greenTick } from "~/assets/animations";
import { Button, ScreenHeader } from "~/src/ui";
import { OTPInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type Props = object;

const OTP = (props: Props) => {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const [isVerified, setIsVerified] = useState(false); // Add state to toggle view
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

  const handleVerify = () => {
    setIsVerified(true); // Toggle to show "Payment Done" message
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallet" />
      {isVerified ? (
        <View style={styles.confirmationContainer}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: 16,
              borderRadius: 16,
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
                #40,000
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              paddingBottom: 24,
            }}
          >
            <LottieView
              style={styles.lottie}
              source={greenTick}
              autoPlay
              loop={false}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#1D1D1D",
                fontSize: 18,
                fontFamily: "AeonikMedium",
              }}
            >
              Your wallet withdrawal was successful
            </Text>
          </View>

          <Button label="Dismiss" />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.headerText}>Wallet</Text>
          <View>
            <Text style={styles.otpTitle}>OTP Verification</Text>
            <Text style={styles.otpSubtitle}>
              Kindly enter the OTP code sent to you
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OTPInput
              codes={codes}
              errorMessages={errorMessages}
              onChangeCode={onChangeCode}
              refs={refs}
              config={config}
            />
          </View>
          <View style={styles.resendContainer}>
            <Button
              // onPress={onResendSubmit}
              variant="link"
              label={`Didn’t receive code? Resend `}
              // disabled={resendDisabled}
              fontFamily="AeonikMedium"
            />
          </View>
          <Button label="Verify" onPress={handleVerify} />
        </View>
      )}
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontFamily: "AeonikBold",
    fontSize: 20,
  },
  otpTitle: {
    paddingTop: 16,
    fontSize: 18,
  },
  otpSubtitle: {
    paddingTop: 8,
  },
  otpContainer: {
    paddingTop: 16,
  },
  resendContainer: {
    marginVertical: 24,
  },
  confirmationContainer: {
    flex: 1,
    padding: 16,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
