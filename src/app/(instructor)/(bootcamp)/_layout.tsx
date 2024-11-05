import { Stack } from "expo-router";
import React from "react";

const bootcamp = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bootcamp" />
    </Stack>
  );
};

export default bootcamp;
