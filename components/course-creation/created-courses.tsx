import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Text, theme } from "~/theme";

// type Props = {
//   course: {
//     id: number;
//     course_image: string;
//     course_name: string;
//     course_description: string;
//     course_price: string;
//     course_intro_video: string;
//     category: {
//       category_name: string;
//     };
//   };
// };

const Course = ({ course }: any) => {
  const router = useRouter();

  console.log(course);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/course-detail",
          params: {
            id: course.id,
          },
        })
      }
      style={styles.container}
    >
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
        {course.course_name}
      </Text>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          color: theme.colors.lightBlack,
        }}
      >
        {course.course_description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Text style={styles.timeline}>{course.course_duration}</Text>
        <Text style={styles.price}>#{course.course_price}</Text>
      </View>
    </Pressable>
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

  timeline: {
    backgroundColor: theme.colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    color: theme.colors.green,
  },
});
