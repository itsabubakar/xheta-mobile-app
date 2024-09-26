import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { Button } from "../ui";

import { CircleX, Xback } from "~/assets/icons";
import { SignUpForm } from "~/components";
import { Text, useTheme } from "~/theme";

const SignUp = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    router.replace("/(learner)/home");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={{ width: 60, flexDirection: "row" }}
          onPress={() => router.back()} // Go back when pressed
        >
          <Xback />
          <Text style={{ paddingLeft: 8 }}>Back</Text>
        </Pressable>

        <View>
          <Text variant="title" style={styles.header}>
            Create an account
          </Text>
        </View>

        {/* Sign up form component */}
        <SignUpForm toggleModal={toggleModal} />

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
              Your account creation was successful
            </Text>

            <Button label="Proceed to dashboard" onPress={toggleModal} />
          </View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor={isModalVisible ? "#000000B3" : "white"} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    textAlign: "center",
    paddingBottom: 24,
    paddingTop: 26,
  },

  formView: {
    marginBottom: 16,
  },
  sheetContainer: {
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
