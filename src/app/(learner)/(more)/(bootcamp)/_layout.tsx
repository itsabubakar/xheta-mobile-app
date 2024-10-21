import { Stack } from "expo-router";
import React from "react";

const MoreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bootcamp" />
      <Stack.Screen name="[bootcamp]" />
    </Stack>
  );
};

export default MoreLayout;
