import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { PlayIcon, StarIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const CourseDetailsHeader = ({ info }: Props) => {
  console.log("Category Details:", JSON.stringify(info.category, null, 2));
  console.log("Owner Details:", JSON.stringify(info.owner, null, 2));

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
          {info.course_name}
        </Text>
        <Text
          style={{
            paddingTop: 8,
          }}
        >
          {info.course_description}
        </Text>
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>
            Language of instruction:{" "}
            <Text style={styles.bold}>{info.language_of_instruction}</Text>
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
            Instructor: <Text style={styles.bold}>{info.owner.name}</Text>
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
