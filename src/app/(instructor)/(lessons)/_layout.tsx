import { Stack } from "expo-router";
import React from "react";

const lessons = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="lessons" />
    </Stack>
  );
};

export default lessons;
