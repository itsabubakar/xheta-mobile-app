import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { PlayIcon, StarIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const CourseDetailsHeader = (props: Props) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        {/* Dark overlay to highlight the PlayIcon */}
        <View style={styles.overlay} />

        {/* Wrapper for PlayIcon to position it in the middle */}
        <Pressable
          onPress={() => console.log("play button clicked")}
          style={styles.playIconWrapper}
        >
          <PlayIcon />
        </Pressable>

        <Image style={styles.image} source={course} />
      </View>
      <View style={{ paddingTop: 16 }}>
        <Text style={{ color: theme.colors.black }} variant="subtitle">
          UI/UX Design Course
        </Text>
        <Text
          style={{
            paddingTop: 8,
          }}
        >
          Welcome to our UI/UX Design course! This comprehensive program will
          equip you with the knowledge and skills to create exceptional user
          interfaces (UI) and enhance user experiences (UX). Dive into the world
          of design thinking, wireframing, prototyping, and usability testing.
          Below is an overview of the curriculum
        </Text>
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>
            Language of instruction: <Text style={styles.bold}>English</Text>
          </Text>

          <Text>
            Certificate: <Text style={styles.bold}>Yes</Text>
          </Text>
        </View>
        <View
          style={{
            paddingTop: 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>
            Instructor: <Text style={styles.bold}>Joe Zaza</Text>
          </Text>

          <Text>
            Course duration: <Text style={styles.bold}>6 weeks</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
          }}
        >
          <Text variant="subtitle">4.8</Text>
          <StarIcon />
        </View>

        <View />
      </View>
    </View>
  );
};

export default CourseDetailsHeader;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%", // Match the container width
    height: 200, // Set container height
    borderRadius: 8,
    position: "relative", // Ensure the imageContainer is a positioned container
    overflow: "hidden", // Hide overflow to respect border radius
  },
  image: {
    width: "100%",
    height: "100%", // Fill the image container
    borderRadius: 8,
  },
  overlay: {
    borderRadius: 8,

    position: "absolute", // Position it over the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensure it covers the entire container
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay with 40% opacity
    zIndex: 5, // Make sure it's below the Play icon but above the image
  },
  playIconWrapper: {
    position: "absolute",
    top: 80,
    left: "47%",
    transform: [{ translateX: -12 }, { translateY: -12 }], // Center the wrapper based on icon dimensions
    zIndex: 10, // Ensure it’s above the overlay and image
  },

  bold: {
    fontFamily: "AeonikBold",
    color: theme.colors.black,
  },
});
