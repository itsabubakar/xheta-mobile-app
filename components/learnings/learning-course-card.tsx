import { Href, Link, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress"; // Import Progress library

import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = {
  progressPercent: number; // Pass in a percentage value for the course progress
  route?: any;
  type: string;
  course_description: string;
  course_image: string;
  course_name: string;
  tutor: string;
};

const LearningsCourseCard = ({
  progressPercent,
  route,
  course_description,
  course_image,
  course_name,
  tutor,
}: Props) => {
  return (
    <Link
      asChild
      href={{
        pathname: route.pathname as any,
        params: route.params,
      }}
    >
      <Pressable style={styles.container}>
        {/* Image Section */}
        <Image
          style={styles.courseImage}
          source={course_image ? { uri: course_image } : course}
        />

        {/* Text Content Section */}
        <View style={styles.textContent}>
          <Text style={styles.courseTitle} variant="md">
            {course_name}
          </Text>
          <Text style={styles.courseDescription} numberOfLines={3}>
            {course_description}
          </Text>

          <View style={{ paddingTop: 4 }}>
            <Text style={styles.price}>{tutor}</Text>

            {/* Progress Bar */}
            <Progress.Bar
              progress={progressPercent / 100} // Convert percentage to decimal
              width={null}
              height={4}
              color={theme.colors.primary}
              unfilledColor={theme.colors.borderColor}
              borderWidth={0}
              borderRadius={4}
              style={styles.progressBar}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default LearningsCourseCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 12,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
    columnGap: 8,
  },
  courseImage: {
    flexBasis: "30%",
    width: "100%",
    height: 106,
    borderRadius: 8,
  },
  textContent: {
    flexBasis: "70%",
  },
  courseTitle: {
    paddingTop: 8,
    paddingBottom: 4,
    color: "#1D1D1D",
  },
  courseDescription: {
    color: theme.colors.lightBlack,
  },
  price: {
    fontFamily: "AeonikBold",
    fontSize: 14,
    color: "#1D1D1D",
  },
  progressBar: {
    marginTop: 8,
  },
});
