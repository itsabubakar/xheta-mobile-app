import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { CircularArrowIcon, PdfIcon, PlayIcon } from "~/assets/icons";
import { intro, tutor } from "~/assets/images";
import { Text, theme } from "~/theme";

const TutorInfo = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-between" }}>
          <Text
            variant="sm"
            style={{
              color: "#027A48",
              backgroundColor: "#ECFDF3",
              paddingHorizontal: 8,
              paddingVertical: 2,
              alignSelf: "flex-start",
              borderRadius: 16,
            }}
          >
            Verified
          </Text>
          <Text variant="subtitle">Shanon Wills</Text>
        </View>
        <Image
          style={{ width: 60, height: 60, borderRadius: 9999 }}
          source={tutor}
        />
      </View>
      <Text style={{ paddingTop: 8, paddingBottom: 16 }}>
        Lorem ipsum dolor sit amet consectetur. Aliquet curabitur eget viverra
        sed imperdiet. Quam dui volutpat eu hendrerit. Tortor elementum integer
        nisi varius facilisi gravida elementum. Magna urna dolor imperdiet
        congue commodo et arcu. Lorem ipsum dolor sit amet consectetur. Aliquet
        curabitur eget viverra sed imperdiet. Quam dui volutpat eu hendrerit.
        Tortor elementum integer nisi varius facilisi gravida elementum. Magna
        urna dolor imperdiet congue commodo et arcu.
      </Text>
      <View>
        <Text variant="md" style={{ paddingBottom: 8 }}>
          Area of expertise
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Tag>Web Dev</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Work</Tag>
        </View>
      </View>
      <View style={{ paddingTop: 16 }}>
        <Text variant="subtitle">Intro Video</Text>
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

          <Image style={styles.image} source={intro} />
        </View>
      </View>
      <View style={{ paddingTop: 16 }}>
        <Text variant="subtitle">Certifications</Text>
        <Certificate text="Certificate" />
        <Certificate text="Certificate" />
      </View>
      <View style={{ paddingTop: 24 }}>
        <Text style={{ marginBottom: -8 }} variant="subtitle">
          Reviews
        </Text>
        <Review />
        <Review />
        <Review />
      </View>
    </View>
  );
};

const Review = () => (
  <View
    style={{
      marginTop: 16,
      padding: 16,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: theme.colors.borderColor,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: theme.colors.black, fontSize: 18 }}>
        Student Feedback
      </Text>
      <Text style={{ color: theme.colors.black }}>July 17</Text>
    </View>
    <Text variant="body" style={{ paddingTop: 8, color: theme.colors.black }}>
      Lorem ipsum dolor sit amet consectetur. Gravida donec non bibendum sed
      nibh tincidunt eget ultricies. Arcu ut sodales ac erat nisi fames enim
      risus. Scelerisque dignissim adipiscing sed facilisi enim. Gravida donec
      non bibendum sed nibh tincidunt eget ultricies. Arcu ut sodales ac erat
      nisi fames enim risus.
    </Text>
  </View>
);

const Certificate = ({ text }: { text: string }) => (
  <View
    style={{
      flexDirection: "row",
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      alignItems: "center",
      padding: 16,
      borderRadius: 16,
      marginTop: 8,
    }}
  >
    <PdfIcon />
    <Text style={{ marginRight: "auto", marginLeft: 16 }}>Certificate</Text>
    <CircularArrowIcon />
  </View>
);

const Tag = ({ children }: { children: string }) => (
  <View
    style={{
      backgroundColor: "#EDEDED",
      paddingHorizontal: 8,
      paddingTop: 2,
      borderRadius: 16,
    }}
  >
    <Text variant="md" style={{ fontSize: 12 }}>
      {children}
    </Text>
  </View>
);

// Usage:

export default TutorInfo;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 8,
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
    top: 82,
    left: "44%",
    transform: [{ translateX: -12 }, { translateY: -12 }], // Center the wrapper based on icon dimensions
    zIndex: 10, // Ensure it’s above the overlay and image
  },
});
