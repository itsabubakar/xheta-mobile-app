import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { Button } from "../ui/button";
import { ControlledInput } from "../ui/form"; // Your existing ControlledInput component

import { Xback } from "~/assets/icons";
import { Text } from "~/theme";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  // Watch the password field to validate the confirm password field
  const password = watch("password");

  return (
    <View style={styles.container}>
      <Pressable style={{ width: 60, flexDirection: "row" }}>
        <Xback />
        <Text style={{ paddingLeft: 8 }}>Back</Text>
      </Pressable>

      <View>
        <Text variant="title" style={styles.header}>
          Create an account
        </Text>
      </View>

      {/* Name Field */}
      <ControlledInput
        name="name"
        control={control}
        label="Enter your name"
        rules={{
          required: "Name is required",
        }}
        placeholder="Your name"
      />
      {errors.name && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.name.message}
        </Text>
      )}

      {/* Email Field */}
      <ControlledInput
        name="email"
        control={control}
        label="Enter your email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Please enter a valid email address",
          },
        }}
        placeholder="Your email"
        keyboardType="email-address"
      />
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.email.message}
        </Text>
      )}

      {/* Password Field */}
      <ControlledInput
        name="password"
        control={control}
        label="Enter your password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        placeholder="Your password"
        secureTextEntry
      />
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.password.message}
        </Text>
      )}

      {/* Confirm Password Field */}
      <ControlledInput
        name="confirmPassword"
        control={control}
        label="Confirm your password"
        rules={{
          required: "Please confirm your password",
          validate: (value: string) =>
            value === password || "Passwords do not match",
        }}
        placeholder="Confirm your password"
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errors.confirmPassword.message}
        </Text>
      )}

      {/* Submit Button */}
      <Button label="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    textAlign: "center",
    paddingBottom: 24,
    paddingTop: 26,
  },
});
