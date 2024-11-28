import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX } from "~/assets/icons";
import { updatePassword } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type FormData = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Security = () => {
  // const authData = useAuthStore((state) => state.authData);
  const accessToken = "uthData?.access_token";

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch, // Allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    if (!accessToken) {
      Alert.alert("Error", "You are not authenticated.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await updatePassword(accessToken, data); // Send API request

      console.log(response); // Debug: Check the API response
      setModalVisible(true);
      reset(); // Clear the input fields on success
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update your password. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader editIcon bg title="Security" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <View>
          <Text style={{ marginBottom: 16, height: 20 }} variant="subtitle">
            Change password
          </Text>

          {/* Current Password Field */}
          <View style={styles.formView}>
            <ControlledInput
              type="password"
              name="old_password"
              control={control}
              shadow
              label="Current password"
              rules={{ required: "Current password is required" }}
              placeholder="Enter current password"
            />
          </View>

          {/* New Password Field */}
          <View style={styles.formView}>
            <ControlledInput
              type="password"
              name="password"
              control={control}
              shadow
              label="New password"
              rules={{ required: "New password is required" }}
              placeholder="Enter new password"
            />
          </View>

          {/* Confirm Password Field */}
          <View style={styles.formView}>
            <ControlledInput
              type="password"
              name="password_confirmation"
              control={control}
              shadow
              label="Confirm password"
              rules={{
                required: "Password confirmation is required",
                validate: (value: any) =>
                  value === password || "Passwords do not match", // Match validation
              }}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && (
              <Text style={{ color: "red" }}>
                {errors.password_confirmation.message}
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginTop: 16, alignItems: "flex-start" }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            label="Change password"
            loading={loading}
            disabled={loading} // Disable if form is invalid or loading
          />
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Pressable onPress={() => setModalVisible(false)}>
            <CircleX style={{ alignSelf: "flex-end" }} />
          </Pressable>
          <LottieView
            style={styles.lottie}
            source={greenTick}
            autoPlay
            loop={false}
          />
          <Text variant="md" style={{ textAlign: "center" }}>
            Successful
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 16 }}>
            Your Password reset was successful
          </Text>
          <Button label="Dismiss" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  modalContent: {
    marginTop: "25%",
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 16,
  },
  lottie: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});
