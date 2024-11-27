import { Stack } from "expo-router";
import React from "react";

const courses = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="courses" />
      <Stack.Screen name="add-courses" />
      <Stack.Screen name="add-modules" />
    </Stack>
  );
};

export default courses;
