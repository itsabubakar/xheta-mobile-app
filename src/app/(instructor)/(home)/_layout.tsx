import { Stack } from "expo-router";
import React from "react";

const HomeRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />

      <Stack.Screen name="wallet" />
      <Stack.Screen name="withdraw" />
      <Stack.Screen name="otp" />
    </Stack>
  );
};

export default HomeRootLayout;
