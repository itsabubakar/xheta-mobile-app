import { Stack } from "expo-router";
import React from "react";

const courses = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tutors" />
      <Stack.Screen name="[tutor]" />
    </Stack>
  );
};

export default courses;
