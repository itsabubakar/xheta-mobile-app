import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Text, theme } from "~/theme";

type Props = {
  course: {
    id: number;
    course_image: string;
    course_name: string;
    course_description: string;
    course_price: string;
    course_intro_video: string;
    category: {
      category_name: string;
    };
  };
};

const Course = ({ course }: Props) => {
  const router = useRouter();

  // console.log(JSON.stringify(course, null, 2), "course");
  // console.log(JSON.stringify(course, null, 2), "course");
  // console.log(JSON.stringify(course, null, 2), "course");
  // console.log(JSON.stringify(course, null, 2), "course");

  const {
    id,
    course_image,
    course_name,
    course_description,
    course_price,
    category,
    course_intro_video,
  } = course;

  const category_name = category?.category_name;

  const courseData = {
    id,
    course_image,
    course_name,
    course_description,
    course_price,
    category_name,
    course_intro_video,
  };

  return (
    <Link
      asChild
      href={{
        pathname: `/(courses)/${course?.id}` as any,
        params: courseData,
      }}
      style={styles.container}
    >
      <Pressable>
        <View>
          <Image
            style={{
              width: "100%",
              height: 106,
              borderRadius: 8,
            }}
            source={{ uri: course.course_image }}
          />
        </View>
        <Text
          style={{
            paddingTop: 8,
            paddingBottom: 4,
            color: "#1D1D1D",
          }}
          variant="md"
        >
          {course?.course_name}
        </Text>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            color: theme.colors.lightBlack,
          }}
        >
          {course?.course_description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 4,
          }}
        >
          <Text style={styles.price}>{course?.course_price}</Text>
          <Text style={styles.price}>5.0</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexBasis: "47%",
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
    maxWidth: 163.5,
    marginBottom: 24,
  },
  price: {
    fontFamily: "AeonikBold",
    fontSize: 14,
    color: "#1D1D1D",
  },
});
