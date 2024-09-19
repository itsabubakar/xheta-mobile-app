import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
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
} from "react-native";

import { Button } from "../ui";
import { OTPInput } from "../ui/form";

import { Text, useTheme } from "~/theme";

type FormData = {
  otp: string;
};
const OTP = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
  });
  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(""));

  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [errorMessages, setErrorMessages] = useState<string[]>();
  const router = useRouter();

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

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);

    router.replace("/otp");
  };

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
          Forgot password?
        </Text>
        <Text variant="subtitle" style={styles.subHeader}>
          We'll send a six-digit code to your email
        </Text>
      </View>
      <OTPInput
        codes={codes!}
        errorMessages={errorMessages}
        onChangeCode={onChangeCode}
        refs={refs}
        config={config}
      />
      <View style={{ marginVertical: 32 }}>
        <Button label="Verify" onPress={handleSubmit(onSubmit)} />
      </View>

      <Button
        onPress={() => router.replace("/forget-password")}
        variant="link"
        label="Didn’t receive code? Resend"
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
