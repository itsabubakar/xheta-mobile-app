import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { TrashIcon } from "~/assets/icons";
import { profile } from "~/assets/images";
import { useAuthStore, AuthData } from "~/src/core/storage";
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
  interest: string[];
};

const Profile = () => {
  const authState = useAuthStore((state) => state.authData);
  const [disabled, setDisabled] = useState(true);
  const { name, email, id, gender, profile_image, level_of_education } =
    authState as AuthData;

  const getNames = (fullName: string) => {
    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");
    return { firstName, lastName };
  };

  const { firstName, lastName } = getNames(name);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      gender: gender || "",
      education: level_of_education || "",
      interest: ["ui/ux design", "female"],
    },
  });

  const onSubmit = () => {
    setDisabled(!disabled);
  };

  const handleEdit = () => {
    setDisabled(!disabled);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader
        editButtonFunction={handleEdit}
        editIcon={disabled}
        bg
        title="Profile"
      />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <View>
          <Text
            style={{
              paddingBottom: 16,
            }}
            variant="subtitle"
          >
            {!disabled ? "Edit" : ""} Personal details
          </Text>
          <View
            style={{
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderRadius: 16,
              marginBottom: 16,
              overflow: "hidden", // Clips the image within the rounded border
            }}
          >
            <Image
              source={{ uri: profile_image }}
              style={{
                position: "absolute", // Fills the parent view
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                resizeMode: "cover", // Ensures proportional scaling without distortion
              }}
            />
          </View>
          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
              disabled={disabled}
              name="firstName"
              control={control}
              shadow
              label="First Name"
              rules={{
                required: "First name is required",
                pattern: {
                  message: "Please enter a first name",
                },
              }}
              placeholder="John"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View style={styles.formView}>
            {/* Last name Field */}
            <ControlledInput
              disabled={disabled}
              name="lastName"
              control={control}
              shadow
              label="Last name"
              rules={{
                required: "Last name is required",
                pattern: {
                  message: "Please enter a valid name",
                },
              }}
              placeholder="Parker"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View style={styles.formView}>
            {/* Email Field */}
            <ControlledInput
              disabled={disabled}
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
              placeholder="jo.parker@gmail.com"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <ControlledDropdown
              disabled={disabled}
              name="gender"
              control={control}
              rules={{ required: "Please select a type" }}
              label="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>
          <View>
            <ControlledDropdown
              disabled={disabled}
              name="education"
              control={control}
              rules={{ required: "Please select a type" }}
              label="Level of education"
              options={[
                { label: "Bachelors", value: "bachelors" },
                { label: "Beginner", value: "Beginner" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>
          <View>
            <ControlledDropdown
              disabled={disabled}
              name="interest"
              control={control}
              multiSelect
              rules={{ required: "Please select a type" }}
              label="Area of Interest"
              options={[
                { label: "UI/UX Design", value: "ui/ux design" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>

          {!disabled && (
            <View style={{ marginTop: 24 }}>
              <Button label="Save Changes" onPress={handleSubmit(onSubmit)} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
  },
});
