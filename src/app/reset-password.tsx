import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { Button } from "../ui";
import { ControlledInput } from "../ui/form"; // Your existing ControlledInput component

import { CircleX, GoogleIcon, Xback } from "~/assets/icons";
import { Text, useTheme } from "~/theme";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const router = useRouter();

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
        <View>
          <Text variant="title" style={styles.header}>
            Reset password
          </Text>
          <Text variant="subtitle" style={styles.subHeader}>
            Kindly input your new password
          </Text>
        </View>

        <View style={styles.formView}>
          {/* Password Field */}
          <ControlledInput
            name="password"
            control={control}
            shadow
            label="New password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            placeholder="Enter new password"
            type="password"
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
            shadow
            label="Confirm new password"
            rules={{
              required: "Please confirm your new password",
              validate: (value: string) =>
                value === password || "Passwords do not match",
            }}
            placeholder="Confirm your password"
            type="password"
          />
          {errors.confirmPassword && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <View style={{ marginVertical: 24 }}>
          {/* Submit Button */}
          {/* <Button label="Create account" onPress={handleSubmit(onSubmit)} /> */}
          <Button label="Change Password" onPress={toggleModal} />
        </View>

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              marginTop: "25%",
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
              <Pressable onPress={toggleModal}>
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
              Password reset successful
            </Text>

            <Button
              label="Proceed to signin"
              onPress={() => router.replace("/signin")}
            />
          </View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor={isModalVisible ? "#000000B3" : "white"} />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 26,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 24,
    height: 20,
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
    width: 120,
    height: 120,
  },
});
