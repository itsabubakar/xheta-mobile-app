import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";

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
          <View style={styles.formView}>
            {/* Gender Field */}
            <ControlledInput
              name="gender"
              control={control}
              shadow
              label="Gender"
              rules={{
                required: "Gender is required",
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
