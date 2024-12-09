import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import { LearningsModule } from "~/components";
import { fetchSingleEnrolledCourse } from "~/src/api/courses";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const LearningsDetail = (props: Props) => {
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
      console.log("fetching", id);
      try {
        setLoading(true);

        const response = await fetchSingleEnrolledCourse(accessToken, id);
        setCourseInfo(response.data); // Save info to state

        console.log(response.data, "single module info");
      } catch (error) {
        console.error("Error fetching module:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchCourseInfo();
  }, [accessToken]);

  // Show spinner while loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Course details" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
        }}
      >
        {courseInfo?.map((lesson: any) => (
          <View key={lesson.id} style={styles.topics}>
            {/* Lesson Number */}
            <Text
              variant="subtitle"
              style={{
                textAlign: "left",
                paddingBottom: 8,
                color: "#1D1D1D",
                fontWeight: "bold",
              }}
            >
              {lesson.lesson_number}
            </Text>
            {/* Map through course modules */}
            {lesson.course_modules.map((module: any) => (
              <View key={module.id} style={{ marginBottom: 16 }}>
                <LearningsModule enrolledCourseId={id} module={module} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default LearningsDetail;

const styles = StyleSheet.create({
  handleContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
  lottie: {
    width: 120,
    height: 120,
  },
  topics: {
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
