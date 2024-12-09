import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { tutor } from "~/assets/images";
import { UpcomingClass } from "~/components";
import { ScheduledClassTime } from "~/components/learnings/personalized-details-info";
import { fetchSinglePersonalizedCourse } from "~/src/api/courses";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const PersonalizedDetails = () => {
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams(); // Pulling the 'params' from the dynamic route

  console.log(id, "id");
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;
  const [loading, setLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState<any>(null);

  useEffect(() => {
    if (!accessToken) return;
    if (!id) return;
    const fetchCourseInfo = async () => {
      setLoading(true);
      console.log("fetching", id);
      try {
        const response = await fetchSinglePersonalizedCourse(accessToken, id);
        setCourseInfo(response.data); // Save info to state
        console.log(response.data, "single personalized info");
      } catch (error) {
        console.error("Error fetching personalized:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchCourseInfo();
  }, [accessToken]);
  return (
    <>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
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
                    {courseInfo?.tutor?.account_activated}
                  </Text>
                  <Text variant="subtitle">{courseInfo?.tutor?.name}</Text>
                </View>
                <Image
                  style={styles.tutorImage}
                  source={
                    courseInfo?.tutor?.profile_image
                      ? { uri: courseInfo?.tutor?.profile_image }
                      : tutor
                  }
                />
              </View>
              <Text style={styles.descriptionText}>
                {courseInfo?.tutor?.bio}
              </Text>
              <View>
                <Text variant="md" style={styles.expertiseText}>
                  Area of expertise
                </Text>
                <View style={styles.tagContainer}>
                  {courseInfo?.tutor?.areas_of_expertise.map(
                    (expertise: string) => (
                      <Tag key={expertise}>{expertise}</Tag>
                    ),
                  )}
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
                <UpcomingClass courseInfo={courseInfo} />
                <ScheduledClassTime courseInfo={courseInfo} />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
