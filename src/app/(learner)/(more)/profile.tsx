import React from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { TrashIcon } from "~/assets/icons";
import { profile } from "~/assets/images";
import { ScreenHeader } from "~/src/ui";
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

const Profile = () => {
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
      <ScreenHeader editIcon bg title="Profile" />
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
            Personal details
          </Text>
          <View
            style={{
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <Image style={{ width: 56, height: 60 }} source={profile} />
          </View>
          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
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
              name="education"
              control={control}
              rules={{ required: "Please select a type" }}
              label="Level of education"
              options={[
                { label: "Bachelors", value: "bachelors" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>
          <View>
            <ControlledDropdown
              name="interest"
              control={control}
              rules={{ required: "Please select a type" }}
              label="Area of Interest"
              options={[
                { label: "UI/UX Design", value: "ui/ux design" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>

          <View style={{ marginTop: 24, alignItems: "flex-end" }}>
            <Pressable
              style={{
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 12,
              }}
            >
              <TrashIcon />
            </Pressable>
          </View>
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
