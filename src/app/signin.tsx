import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";

import { Button } from "../ui";
import { ControlledInput } from "../ui/form"; // Your existing ControlledInput component

import { greenTick } from "~/assets/animations";
import { CircleX, GoogleIcon, Xback } from "~/assets/icons";
import { Text, useTheme } from "~/theme";
const { width } = Dimensions.get("window");

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignIn = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const theme = useTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // variables
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable style={{ width: 60, flexDirection: "row" }}>
          <Xback />
          <Text style={{ paddingLeft: 8 }}>Back</Text>
        </Pressable>

        <View>
          <Text variant="title" style={styles.header}>
            Sign In to your account
          </Text>
          <Text>Welcome back! Please sing in with</Text>
        </View>

        <View style={styles.formView}>
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

        <View style={styles.formView}>
          {/* Password Field */}
          <ControlledInput
            name="password"
            control={control}
            shadow
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

        <View style={{ marginVertical: 24 }}>
          {/* Submit Button */}
          {/* <Button label="Create account" onPress={handleSubmit(onSubmit)} /> */}
          <Button label="Sign In" onPress={toggleModal} />
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
            label="Sign in with Google"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              marginTop: "50%",
              backgroundColor: theme.colors.white,
              padding: 16,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Pressable>
                <CircleX />
              </Pressable>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Lottie
                style={styles.lottie}
                source={require("../../assets/animations/green-tick.json")}
                autoPlay
                loop
              />
            </View>

            <Text
              variant="normal_bold"
              style={{ textAlign: "center", paddingVertical: 16 }}
            >
              Your account sign in was successful
            </Text>

            <Button label="Proceed to dashboard" onPress={toggleModal} />
          </View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#00000e" />
    </View>
  );
};

export default SignIn;

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
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  lottie: {
    width: width * 0.95,
    height: width,
    marginBottom: 150,
  },
});
