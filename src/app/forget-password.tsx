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

    router.replace("/reset-password");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="title" style={styles.header}>
          Forgot password?
        </Text>
        <Text variant="subtitle" style={styles.subHeader}>
          We'll send a six-digit code to your email"
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
        <Button label="Send Code" onPress={handleSubmit(onSubmit)} />
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
});
