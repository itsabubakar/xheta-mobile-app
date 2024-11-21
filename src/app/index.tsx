import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";

import { Button } from "../ui/button";

import { onboardingBg } from "~/assets/images";
import { useAuthStore } from "~/src/core/storage"; // Import your auth store
import { Text, theme } from "~/theme";

type Props = {
  text: string;
};

const CheckBox = ({
  isChecked,
  setChecked,
  header,
  text,
  mb,
}: {
  isChecked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  header: string;
  text: string;
  mb?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
        borderRadius: 8,
        padding: 16,
        marginBottom: mb ? 16 : 0,
      }}
    >
      <View>
        <Text style={{ paddingBottom: 2 }} variant="subtitle">
          {header}
        </Text>
        <Text style={{ height: 18 }}>{text}</Text>
      </View>
      <Checkbox value={isChecked} onValueChange={setChecked} />
    </View>
  );
};

const OnBoarding = (props: Props) => {
  const [isLearnerChecked, setLearnerChecked] = useState(false);
  const [isInstructorChecked, setInstructorChecked] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Track selected role
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Access auth state
  const hydrateAuthData = useAuthStore((state) => state.hydrateAuthData); // Hydrate auth data

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Hydrate auth data
        await hydrateAuthData();
      } catch (error) {
        console.error("Error hydrating auth data", error);
      } finally {
        setLoading(false); // Stop loading after the check
      }
    };

    checkAuthentication();
  }, [hydrateAuthData]);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Redirect to 'learner/home' if authenticated
      const redirectToHome = async () => {
        setLoading(true); // Set loading state to true before routing
        await new Promise((resolve) => setTimeout(resolve, 100)); // Optional: Add a small delay
        router.replace("/(learner)/home");
      };
      redirectToHome();
    }
  }, [loading, isAuthenticated, router]);

  // Show spinner while loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  // When checking "Learner", uncheck "Instructor" and set selected role
  const handleLearnerChange = (newValue: SetStateAction<boolean>) => {
    if (typeof newValue === "function") {
      setLearnerChecked(newValue(isLearnerChecked));
    } else {
      setLearnerChecked(newValue);
    }
    if (newValue) {
      setInstructorChecked(false);
      setSelectedRole("learner");
    }
  };

  const handleInstructorChange = (newValue: SetStateAction<boolean>) => {
    if (typeof newValue === "function") {
      setInstructorChecked(newValue(isInstructorChecked));
    } else {
      setInstructorChecked(newValue);
    }
    if (newValue) {
      setLearnerChecked(false);
      setSelectedRole("tutor");
    }
  };

  // Enable button if one checkbox is checked
  const isButtonEnabled = isLearnerChecked || isInstructorChecked;

  return (
    <>
      <Image source={onboardingBg} style={{ width: "auto", height: 509 }} />

      <View style={styles.buttonsContainer}>
        <View>
          <Text
            variant="title"
            style={[styles.centeredText, { paddingBottom: 8, paddingTop: 32 }]}
          >
            Welcome to Xheta
          </Text>
          <Text
            variant="body"
            style={[styles.centeredText, { paddingBottom: 24 }]}
          >
            Kindly select the account type you will like to create
          </Text>
          <CheckBox
            isChecked={isLearnerChecked}
            setChecked={handleLearnerChange}
            header="Learner"
            text="Seeking to learn from others"
            mb
          />
          <CheckBox
            isChecked={isInstructorChecked}
            setChecked={handleInstructorChange}
            header="Instructor"
            text="Seeking to tutor others "
          />

          <View style={{ marginTop: 24 }}>
            <Button
              disabled={!isButtonEnabled}
              onPress={() => router.push(`/(instructor)/home`)} // Pass the selected role to the next screen
              label="Proceed"
            />
            {/* <Button
              disabled={!isButtonEnabled}
              onPress={() => router.push(`/signup?role=${selectedRole}`)} // Pass the selected role to the next screen
              label="Proceed"
            /> */}
          </View>
        </View>
        <View />
      </View>
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  buttonsContainer: {
    borderRadius: 32,
    marginTop: -90,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
  },
  centeredText: {
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
