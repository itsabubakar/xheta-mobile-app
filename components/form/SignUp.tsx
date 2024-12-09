import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { CircleX, GoogleIcon } from "~/assets/icons";
import { signUp } from "~/src/api";
import { useSignUp } from "~/src/api/auth";
import { useAuthStore } from "~/src/core/storage";
import { Button } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import Toast from "~/src/ui/toast/custom-toast";
import { Text, useTheme } from "~/theme";

type Props = {
  role: string;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  time_zone: string;
};

const SignUp = ({ role }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const { signUp, error } = useSignUp();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  // Manage loading state
  const [loading, setLoading] = useState(false);

  console.log(role);

  // Form hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role,
      time_zone: "America/New_York",
    },
  });

  const onSubmit = async (data: FormData) => {
    const cleanedEmail = data.email.toLowerCase();

    setLoading(true); // Start loading when request is initiated

    try {
      const res = await signUp({
        name: data.name,
        email: cleanedEmail,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role,
        time_zone: "America/New_York",
      });

      const { access_token, data: userData } = res;

      // Use the Zustand store to set the auth data
      await useAuthStore.getState().setAuthData({
        access_token,
        account_activated: userData.account_activated,
        created_at: userData.created_at,
        email: userData.email,
        id: userData.id,
        name: userData.name,
        role: userData.role,
        is_first_time: true,
      });

      setLoading(false); // Stop loading once the request is complete
      setModalVisible(true); // Show the modal after successful account creation
    } catch (err) {
      showToast(error || "An unexpected error occurred");
      console.error(error, "status error");
      setLoading(false); // Stop loading if the request fails
    }
  };

  // Watch the password field to validate the confirm password field
  const password = watch("password");

  return (
    <>
      <View style={styles.formView}>
        {toastVisible && (
          <Toast
            type="error"
            message={toastMessage}
            onDismiss={() => setToastVisible(false)}
          />
        )}
        {/* Name Field */}
        <ControlledInput
          name="name"
          shadow
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
          name="password_confirmation"
          control={control}
          shadow
          label="Confirm your password"
          rules={{
            required: "Please confirm your password",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
          placeholder="Confirm your password"
          type="password"
        />
        {errors.password_confirmation && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.password_confirmation.message}
          </Text>
        )}
      </View>

      <View style={{ marginVertical: 24 }}>
        {/* Submit Button with loading state */}
        <Button
          label="Create account"
          onPress={handleSubmit(onSubmit)}
          disabled={loading} // Disable button when loading
          loading={loading} // Show loading spinner
        />
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

      <View>
        <Button
          onPress={() => router.replace("/signin")}
          variant="link"
          label="Already have an account? Sign in"
          fontFamily="AeonikMedium"
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
              source={require("../../assets/animations/green-tick.json")}
              autoPlay
              loop={false}
            />
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingVertical: 16 }}
          >
            Your account was created successfully!
          </Text>

          <Button
            label="Proceed to dashboard"
            onPress={() => {
              setModalVisible(false);
              router.replace("/(learner)/home"); // Navigate to dashboard
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
