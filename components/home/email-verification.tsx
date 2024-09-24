import LottieView from "lottie-react-native";
import React, { RefObject, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "~/src/ui";
import { ControlledInput, OTPInput } from "~/src/ui/form";
import { Text, useTheme } from "~/theme";

type Props = {};

type FormData = {
  email?: string;
  otp?: string;
};

const EmailVerification = (props: Props) => {
  const theme = useTheme();
  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(""));
  const [step, setStep] = useState(1); // Step state to track the current screen
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

  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [errorMessages, setErrorMessages] = useState<string[]>();

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

  const onOtpSubmit = (data: FormData) => {
    console.log("Form submitted:", data.otp);
    setStep(3); // Move to the congratulations screen
  };

  const onSubmit = (data: FormData) => {
    // Handle the email submission, e.g., send verification email
    console.log("Email submitted:", data.email);
    setStep(2); // Move to the OTP screen
  };

  const handleProfileUpdate = () => {
    setStep(4); // Move to the congratulations screen
  };

  // Render the appropriate screen based on the step state
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {step === 1 && (
        <>
          <Text variant="subtitle">Email verification</Text>
          <Text style={{ marginTop: 8, marginBottom: 16 }}>
            Kindly enter your email for verification process
          </Text>
          <View style={styles.formView}>
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
          <Button label="Proceed" onPress={handleSubmit(onSubmit)} />
        </>
      )}
      {step === 2 && (
        <>
          <Text variant="subtitle">Email verification</Text>
          <Text style={{ marginTop: 8, marginBottom: 16 }}>
            A six digit code has been sent to your email, kindly enter the code
            below to verify your account.
          </Text>
          <OTPInput
            codes={codes!}
            errorMessages={errorMessages}
            onChangeCode={onChangeCode}
            refs={refs}
            config={config}
          />
          <Text style={{ marginTop: 16, marginBottom: 24 }}>
            Didn’t receive code? Resend
          </Text>

          <View>
            <Button label="Verify" onPress={handleSubmit(onOtpSubmit)} />
          </View>
        </>
      )}
      {step === 3 && (
        <View>
          <View style={{ alignSelf: "center" }}>
            <LottieView
              style={styles.lottie}
              source={require("../../assets/animations/green-tick.json")}
              autoPlay
              loop
            />
          </View>
          <Text
            variant="subtitle"
            style={{ textAlign: "center", paddingBottom: 24 }}
          >
            Your email verification is successful
          </Text>
          <Button label="Proceed" onPress={handleSubmit(handleProfileUpdate)} />
        </View>
      )}
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 20,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
