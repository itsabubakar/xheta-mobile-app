import { Stack } from "expo-router";
import React from "react";

const courses = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="courses" />
      <Stack.Screen name="[course]" />
      <Stack.Screen name="search-course" />
    </Stack>
  );
};

export default courses;
