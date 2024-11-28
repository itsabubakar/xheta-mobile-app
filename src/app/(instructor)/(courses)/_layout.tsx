import { Stack } from "expo-router";
import React from "react";

const courses = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="courses" />
      <Stack.Screen name="add-courses" />
      <Stack.Screen name="add-modules" />
      <Stack.Screen name="course-detail" />
      <Stack.Screen name="edit-course" />
      <Stack.Screen name="add-assignment" />
    </Stack>
  );
};

export default courses;
