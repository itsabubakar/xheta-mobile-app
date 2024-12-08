import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { LearningsCourseCard, LearningsSection } from "~/components";
import {
  fetchEnrolledCourses,
  fetchPersonalizedCourses,
} from "~/src/api/courses";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithTabs } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Learnings = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Ongoing");

  // Separate states for enrolled and personalized courses
  const [ongoingEnrolledCourses, setOngoingEnrolledCourses] = useState([]);
  const [completedEnrolledCourses, setCompletedEnrolledCourses] = useState([]);
  const [ongoingPersonalizedCourses, setOngoingPersonalizedCourses] = useState(
    [],
  );
  const [completedPersonalizedCourses, setCompletedPersonalizedCourses] =
    useState([]);
  const [courseTab, setCourseTab] = useState("Courses"); // New state for the top tabs

  const [loading, setLoading] = useState(true);

  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data concurrently
        const [enrolledResponse, personalizedResponse] = await Promise.all([
          fetchEnrolledCourses(accessToken),
          fetchPersonalizedCourses(accessToken),
        ]);

        // Separate fetched data
        const enrolledData = enrolledResponse.enrolled_courses || [];
        const personalizedData = personalizedResponse.data || [];

        // Categorize enrolled courses
        const ongoingEnrolled = enrolledData.filter(
          (item: any) => item.completed === false || item.completed === null,
        );
        const completedEnrolled = enrolledData.filter(
          (item: any) => item.completed === true,
        );

        const ongoingPersonalized = personalizedData.filter(
          (item: any) => item.completed === false,
        );
        const completedPersonalized = personalizedData.filter(
          (item: any) => item.completed === true,
        );

        // Update states
        setOngoingEnrolledCourses(ongoingEnrolled);
        setCompletedEnrolledCourses(completedEnrolled);
        setOngoingPersonalizedCourses(ongoingPersonalized);
        setCompletedPersonalizedCourses(completedPersonalized);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchData();
  }, [accessToken]);

  // Get the correct data to render based on the active tab and course tab
  const getDataToRender = () => {
    if (courseTab === "Courses") {
      return activeTab === "Ongoing"
        ? ongoingEnrolledCourses
        : completedEnrolledCourses;
    }
    if (courseTab === "Personalized") {
      return activeTab === "Ongoing"
        ? ongoingPersonalizedCourses
        : completedPersonalizedCourses;
    }
    return [];
  };

  const dataToRender = getDataToRender();

  return (
    <View style={styles.container}>
      {/* Display loading indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <ScreenHeaderWithTabs
            tabs={["Ongoing", "Completed"]}
            onTabChange={handleTabChange}
            title="Learnings"
          />
          <View style={styles.topTabsContainer}>
            {["Courses", "Personalized"].map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setCourseTab(tab)}
                style={[
                  styles.tabButton,
                  courseTab === tab && styles.activeTabButton, // Apply active border style
                ]}
              >
                <Text
                  variant="md"
                  style={[
                    styles.tabText,
                    courseTab === tab ? { color: theme.colors.primary } : {},
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
          {/* Content based on active and course tabs */}
          {dataToRender.length > 0 ? (
            (console.log(dataToRender, courseTab),
            (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  rowGap: 16,
                }}
              >
                {dataToRender.map((course: any, i: any) => (
                  <LearningsCourseCard
                    key={i}
                    course_name={course.course_name}
                    type={courseTab}
                    tutor={course.tutor}
                    progressPercent={course.course_progress}
                    course_description={course.course_description}
                    course_image={course.course_image}
                  />
                ))}
              </ScrollView>
            ))
          ) : (
            <Text style={styles.noDataText}>No completed courses</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Learnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 10,
    marginLeft: 15,
  },
  topTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "transparent",
    flex: 1,
  },
  activeTabButton: {
    borderColor: theme.colors.primary, // Show primary border on active tab
  },
  tabText: {
    color: theme.colors.black,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.gray,
  },
});
