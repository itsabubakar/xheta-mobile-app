import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

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

const TutorInfo = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text variant="sm" style={styles.verifiedText}>
            Verified
          </Text>
          <Text variant="subtitle">Shanon Wills</Text>
        </View>
        <Image style={styles.tutorImage} source={tutor} />
      </View>
      <Text style={styles.descriptionText}>
        Lorem ipsum dolor sit amet consectetur. Aliquet curabitur eget viverra
        sed imperdiet. Quam dui volutpat eu hendrerit. Tortor elementum integer
        nisi varius facilisi gravida elementum. Magna urna dolor imperdiet
        congue commodo et arcu. Lorem ipsum dolor sit amet consectetur. Aliquet
        curabitur eget viverra sed imperdiet. Quam dui volutpat eu hendrerit.
        Tortor elementum integer nisi varius facilisi gravida elementum. Magna
        urna dolor imperdiet congue commodo et arcu.
      </Text>
      <View>
        <Text variant="md" style={styles.expertiseText}>
          Area of expertise
        </Text>
        <View style={styles.tagContainer}>
          <Tag>Web Dev</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Design</Tag>
          <Tag>Web Work</Tag>
        </View>
      </View>
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
      <View style={styles.certificationContainer}>
        <Text variant="subtitle">Certifications</Text>
        <Certificate text="Certificate" />
        <Certificate text="Certificate" />
      </View>
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewTitle} variant="subtitle">
          Reviews
        </Text>
        <Review rating={3} />
        <Review rating={2} />
        <Review rating={4.5} />
        <Review rating={1.5} />
      </View>
    </View>
  );
};

const Review = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitleText}>Student Feedback</Text>
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
        Lorem ipsum dolor sit amet consectetur. Gravida donec non bibendum sed
        nibh tincidunt eget ultricies. Arcu ut sodales ac erat nisi fames enim
        risus. Scelerisque dignissim adipiscing sed facilisi enim. Gravida donec
        non bibendum sed nibh tincidunt eget ultricies. Arcu ut sodales ac erat
        nisi fames enim risus.
      </Text>
    </View>
  );
};

const Certificate = ({ text }: { text: string }) => (
  <View style={styles.certificateContainer}>
    <PdfIcon />
    <Text style={styles.certificateText}>{text}</Text>
    <CircularArrowIcon />
  </View>
);

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
