import { Stack } from "expo-router";
import React from "react";

const MoreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="community" />
      <Stack.Screen name="[community]" />
    </Stack>
  );
};

export default MoreLayout;
