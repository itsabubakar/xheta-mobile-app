import React, { useRef } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Video, { VideoRef } from "react-native-video";

import { CustomVideoPlayer } from "../video";

import { PlayIcon, StarIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = {
  info: any;
};

const CourseDetailsHeader = ({ info }: Props) => {
  console.log(info.course_intro_video);
  const videoRef = useRef<VideoRef>(null);

  const onBuffer = () => {
    console.log("buffering");
  };

  const onError = () => {
    console.log("Error buffering");
  };
  return (
    <View>
      {info.course_intro_video && (
        <CustomVideoPlayer source={info.course_intro_video} />
      )}
      <View style={{ paddingTop: 16 }}>
        <Text style={{ color: theme.colors.black }} variant="subtitle">
          {info?.course_name}
        </Text>
        <Text
          style={{
            paddingTop: 8,
          }}
        >
          {info?.course_description}
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
            <Text style={styles.bold}>{info?.language_of_instruction}</Text>
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
          <Text style={{ flex: 1 }}>
            Instructor: <Text style={styles.bold}>{info?.category_name}</Text>
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
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
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
    textTransform: "capitalize",
  },
});
