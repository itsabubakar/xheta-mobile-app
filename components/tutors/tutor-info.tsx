import * as FileSystem from "expo-file-system";
import React from "react";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";

import {
  CircularArrowIcon,
  EmptyStar,
  FilledStar,
  HalfFilledStar,
  PdfIcon,
  PlayIcon,
} from "~/assets/icons";
import { intro, tutor } from "~/assets/images";
import { Text, theme } from "~/theme";

const TutorInfo = ({ info }: any) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text variant="sm" style={styles.verifiedText}>
            {info?.account_activated}
          </Text>
          <Text variant="subtitle">{info.name}</Text>
        </View>
        <Image
          style={styles.tutorImage}
          source={info.profile_image ? { uri: info.profile_image } : tutor}
        />
      </View>
      <Text style={styles.descriptionText}>{info?.bio}</Text>
      <View>
        <Text variant="md" style={styles.expertiseText}>
          Area of expertise
        </Text>
        <View style={styles.tagContainer}>
          {info?.areas_of_expertise.map((expertise: string) => (
            <Tag key={expertise}>{expertise}</Tag>
          ))}
        </View>
      </View>
      {info.intro_video && (
        <View style={styles.introVideoContainer}>
          <Text variant="subtitle">Intro Video</Text>
          <View style={styles.imageContainer}>
            <View style={styles.overlay} />
            <Pressable
              onPress={() => console.log("play button clicked")}
              style={styles.playIconWrapper}
            >
              <PlayIcon />
            </Pressable>
            <Image style={styles.image} source={intro} />
          </View>
        </View>
      )}
      <View style={styles.certificationContainer}>
        <Text variant="subtitle">Certifications</Text>
        {info.certifications.map((certification: string) => (
          <Certificate
            url={certification}
            key={certification}
            text="Certificate"
          />
        ))}
      </View>
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewTitle} variant="subtitle">
          Reviews
        </Text>

        {info?.tutorReviews.map((review: any) => (
          <Review review={review} key={review.id} />
        ))}
      </View>
    </View>
  );
};

const Review = ({ review }: any) => {
  const filledStars = Math.floor(review.rating);
  const hasHalfStar = review.rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitleText}>{review.reviewer}</Text>
        <Text style={styles.reviewDateText}>July 17</Text>
      </View>
      <View style={styles.starContainer}>
        {Array.from({ length: filledStars }).map((_, index) => (
          <FilledStar key={`filled-${index}`} />
        ))}
        {hasHalfStar && <HalfFilledStar />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <EmptyStar key={`empty-${index}`} />
        ))}
      </View>
      <Text variant="body" style={styles.reviewDescriptionText}>
        {review.review}
      </Text>
    </View>
  );
};

const Certificate = ({ text, url }: { text: string; url: string }) => {
  const handleDownload = async () => {
    try {
      // Define the path where the file will be saved
      const fileUri = `${FileSystem.documentDirectory}${text}.pdf`;

      // Download the file
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      // Confirm download success
      if (downloadResult.status === 200) {
        Alert.alert(
          "Download Successful",
          `File saved to ${downloadResult.uri}`,
        );
      } else {
        Alert.alert("Download Failed", "An error occurred while downloading.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Download Error",
        "An error occurred while downloading the file.",
      );
    }
  };
  return (
    <Pressable onPress={handleDownload} style={styles.certificateContainer}>
      <PdfIcon />
      <Text style={styles.certificateText}>{text}</Text>
      <CircularArrowIcon />
    </Pressable>
  );
};

const Tag = ({ children }: { children: string }) => (
  <View style={styles.tag}>
    <Text variant="md" style={styles.tagText}>
      {children}
    </Text>
  </View>
);

export default TutorInfo;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "space-between",
  },
  verifiedText: {
    color: "#027A48",
    backgroundColor: "#ECFDF3",
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    borderRadius: 16,
  },
  tutorImage: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  descriptionText: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  expertiseText: {
    paddingBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  introVideoContainer: {
    paddingTop: 16,
  },
  certificationContainer: {
    paddingTop: 16,
  },
  reviewsContainer: {
    paddingTop: 24,
  },
  reviewTitle: {
    marginBottom: -8,
  },
  reviewContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  reviewTitleText: {
    color: theme.colors.black,
    fontSize: 18,
  },
  reviewDateText: {
    color: theme.colors.black,
  },
  reviewDescriptionText: {
    paddingTop: 8,
    color: theme.colors.black,
  },
  certificateContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  certificateText: {
    marginRight: "auto",
    marginLeft: 16,
  },
  tag: {
    backgroundColor: "#EDEDED",
    paddingHorizontal: 8,
    paddingTop: 2,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
  },
  imageContainer: {
    marginTop: 8,
    width: "100%",
    height: 200,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlay: {
    borderRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 5,
  },
  playIconWrapper: {
    position: "absolute",
    top: 82,
    left: "44%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
  },
});
