import React from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { TrashIcon } from "~/assets/icons";
import { profile } from "~/assets/images";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledDropdown } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  education: string;
  interest: string;
};

const Security = () => {
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
      <ScreenHeader editIcon bg title="Security" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <View>
          <Text
            style={{
              marginBottom: 16,
              height: 20,
            }}
            variant="subtitle"
          >
            Change password
          </Text>

          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
              type="password"
              name="firstName"
              control={control}
              shadow
              label="Current password"
              rules={{
                required: "Current password is required",
                pattern: {
                  message: "Please enter a current password",
                },
              }}
              placeholder="Enter current password"
            />
          </View>
          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
              type="password"
              name="firstName"
              control={control}
              shadow
              label="New password"
              rules={{
                required: "Current password is required",
                pattern: {
                  message: "Please enter a current password",
                },
              }}
              placeholder="Enter current password"
            />
          </View>
          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
              type="password"
              name="firstName"
              control={control}
              shadow
              label="Confirm password"
              rules={{
                required: "Current password is required",
                pattern: {
                  message: "Please enter a current password",
                },
              }}
              placeholder="Enter current password"
            />
          </View>
        </View>
        <View style={{ marginTop: 16, alignItems: "flex-start" }}>
          <Button label="Change password" disabled />
        </View>
      </ScrollView>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
  },
});
