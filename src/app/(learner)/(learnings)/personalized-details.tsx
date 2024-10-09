import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { tutor } from "~/assets/images";
import { UpcomingClass } from "~/components";
import { ScheduledClassTime } from "~/components/learnings/personalized-details-info";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const PersonalizedDetails = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >
      <ScreenHeader bg title="Course module" />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
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
            Lorem ipsum dolor sit amet consectetur. Aliquet curabitur eget
            viverra sed imperdiet. Quam dui volutpat eu hendrerit. Tortor
            elementum integer nisi varius facilisi gravida elementum. Magna urna
            dolor imperdiet congue commodo et arcu. Lorem ipsum dolor sit amet
            consectetur. Aliquet curabitur eget viverra sed imperdiet. Quam dui
            volutpat eu hendrerit. Tortor elementum integer nisi varius facilisi
            gravida elementum. Magna urna dolor imperdiet congue commodo et
            arcu.
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
          <View
            style={{
              paddingTop: 24,
            }}
          >
            <Text style={{ marginBottom: 8 }} variant="md">
              Upcoming classes
            </Text>
            <UpcomingClass />
            <ScheduledClassTime />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const Tag = ({ children }: { children: string }) => (
  <View style={styles.tag}>
    <Text variant="md" style={styles.tagText}>
      {children}
    </Text>
  </View>
);

export default PersonalizedDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
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

  tag: {
    backgroundColor: "#EDEDED",
    paddingHorizontal: 8,
    paddingTop: 2,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
  },
});
