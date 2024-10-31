import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Course from "./course";

import { noContent } from "~/assets/images";
import { SectionHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const CourseSection = ({ courses }: any) => {
  const router = useRouter();
  const { enrolled_courses } = courses;
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Course progress" link="/" />
      {enrolled_courses.length > 0 ? (
        enrolled_courses.map((course: any) => (
          <Course key={course.course_name} course={course} />
        ))
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={noContent} />
          <Text
            style={{
              paddingTop: 16,
              textAlign: "center",
            }}
          >
            You have not enrolled to any course yet. Browse Courses...
          </Text>
          <Pressable onPress={() => router.push("/(courses)/courses")}>
            <Text
              variant="md"
              style={{
                color: theme.colors.primary,
              }}
            >
              Browse Courses
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CourseSection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },
});
