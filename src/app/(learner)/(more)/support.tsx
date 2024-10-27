import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View, Alert } from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX } from "~/assets/icons";
import { createComplaint } from "~/src/api";
import { useAuthStore } from "~/src/core/storage"; // Access token from Zustand
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type FormData = {
  email: string;
  phone: string;
  complaint: string;
};

const Support = () => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      phone: "",
      complaint: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!accessToken) {
      Alert.alert("Error", "You are not authenticated.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const complaint = await createComplaint(accessToken, data); // Send complaint data
      console.log(complaint);
      reset();

      setModalVisible(true); // Show success modal on success
    } catch (error) {
      console.error("Error submitting complaint:", error);
      Alert.alert("Error", "Failed to submit your complaint. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader editIcon bg title="Support" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentWrapper}>
          <View>
            <Text variant="md" style={{ textAlign: "center" }}>
              Support form
            </Text>
            <Text style={{ marginTop: 8, textAlign: "center" }} variant="sm">
              Have some complaints? Kindly fill out the form below, and we will
              look into it.
            </Text>

            <View style={styles.formView}>
              <ControlledInput
                name="email"
                control={control}
                shadow
                label="Email address"
                rules={{
                  required: "Email address is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                }}
                placeholder="Enter email address"
              />
              {errors.email && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View style={styles.formView}>
              <ControlledInput
                name="phone"
                control={control}
                shadow
                label="Phone"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.phone.message}
                </Text>
              )}
            </View>

            <View style={styles.formView}>
              <ControlledTextArea
                name="complaint"
                control={control}
                label="Complaint"
                placeholder="Enter your complaint"
                rules={{
                  required: "Complaint is required",
                }}
              />
              {errors.complaint && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.complaint.message}
                </Text>
              )}
            </View>
          </View>

          <View>
            <Button
              onPress={handleSubmit(onSubmit)}
              size="md"
              label="Submit"
              loading={loading} // Show loading spinner while submitting
            />
          </View>

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
                Our support team will get in touch with you within 24 - 48
                hours.
              </Text>
              <Button label="Dismiss" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
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
