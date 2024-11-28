import { Stack } from "expo-router";
import React from "react";

const MoreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="more" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="accomplishment" />
      <Stack.Screen name="payment-history" />
      <Stack.Screen name="(community)" />
    </Stack>
  );
};

export default MoreLayout;
