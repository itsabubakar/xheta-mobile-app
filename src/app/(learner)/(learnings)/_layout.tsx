import { Stack } from "expo-router";
import React from "react";

const learnings = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="learnings" />
      <Stack.Screen name="module" />
      <Stack.Screen name="module-details" />
      <Stack.Screen name="personalized-details" />
    </Stack>
  );
};

export default learnings;
