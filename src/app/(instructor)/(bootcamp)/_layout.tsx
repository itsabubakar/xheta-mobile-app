import { Stack } from "expo-router";
import React from "react";

const bootcamp = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bootcamp" />
      <Stack.Screen name="add-bootcamp" />
      <Stack.Screen name="bootcamp-details" />
      <Stack.Screen name="edit-bootcamp" />
    </Stack>
  );
};

export default bootcamp;
