import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { Button } from "../ui/button";
import { ControlledInput } from "../ui/form"; // Your existing ControlledInput component

import { GoogleIcon, Xback } from "~/assets/icons";
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

      <View style={styles.formView}>
        {/* Name Field */}
        <ControlledInput
          name="name"
          control={control}
          label="Fullname"
          rules={{
            required: "Name is required",
          }}
          placeholder="Enter name"
        />
        {errors.name && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.name.message}
          </Text>
        )}
      </View>

      <View style={styles.formView}>
        {/* Email Field */}
        <ControlledInput
          name="email"
          control={control}
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

      <View style={styles.formView}>
        {/* Password Field */}
        <ControlledInput
          name="password"
          control={control}
          label="Password"
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
      </View>

      <View>
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
      </View>

      <View style={{ marginVertical: 24 }}>
        {/* Submit Button */}
        <Button label="Create account" onPress={handleSubmit(onSubmit)} />
      </View>

      {/* Divider with OR */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 24 }}>
        {/* google sign up */}
        <Button
          variant="outline"
          icon={<GoogleIcon />}
          label="Sign up with Google"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D2D2D2",
  },
  orText: {
    marginHorizontal: 10,
    color: "#686868",
    fontWeight: "bold",
  },

  formView: {
    marginBottom: 16,
  },
});
