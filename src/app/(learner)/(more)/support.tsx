import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX } from "~/assets/icons";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  education: string;
  interest: string;
};

const Support = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      education: "",
      interest: "",
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader editIcon bg title="Support" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Container to handle layout */}
        <View style={styles.contentWrapper}>
          <View>
            <Text variant="md" style={{ textAlign: "center" }}>
              Support form
            </Text>
            <Text style={{ marginTop: 8, textAlign: "center" }} variant="sm">
              Have some complaints, Kindly fill the form below so we can look
              into it.
            </Text>
            <View style={styles.formView}>
              {/* First name Field */}
              <ControlledInput
                name="firstName"
                control={control}
                shadow
                label="Email address"
                rules={{
                  required: "First name is required",
                  pattern: {
                    message: "Please enter a first name",
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
              {/* First name Field */}
              <ControlledInput
                type="text"
                name="firstName"
                control={control}
                shadow
                label="Phone"
                rules={{
                  required: "First name is required",
                  pattern: {
                    message: "Please enter a first name",
                  },
                }}
                placeholder="Enter phone number"
              />
              {errors.email && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View>
              <ControlledTextArea
                control={control}
                name="firstName"
                label="Complaint"
                placeholder="Enter your complaint"
              />
            </View>
          </View>

          {/* Button at the bottom */}
          <View>
            <Button
              onPress={() => setModalVisible(true)}
              size="md"
              label="Submit"
            />
          </View>

          {/* Modal for success message */}
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
                <Pressable onPress={() => setModalVisible(false)}>
                  <CircleX />
                </Pressable>
              </View>
              <View style={{ alignSelf: "center" }}>
                <LottieView
                  style={styles.lottie}
                  source={greenTick}
                  autoPlay
                  loop={false}
                />
              </View>

              <Text
                variant="md"
                style={{ textAlign: "center", paddingVertical: 4 }}
              >
                Successful
              </Text>
              <Text
                style={{
                  paddingBottom: 16,
                  textAlign: "center",
                }}
              >
                Kindly note that our support team will get in touch with you
                within 24 - 48 hours.
              </Text>

              <Button
                label="Dismiss"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
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
    paddingBottom: 16, // To prevent content being cut off
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between", // Pushes content to the top and button to the bottom
    padding: 16,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
