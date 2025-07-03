import BottomSheet from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AssignmentSection,
  CourseSection,
  HomeBottomSheet,
  InformationBoardSection,
} from "~/components";
import {
  getUpcomingClasses,
  getDashboardCourses,
  fetchCategories,
} from "~/src/api"; //
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithUsername } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Home = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [courses, setCourses] = useState(null);
  const [upcomingClasses, setUpcomingClasses] = useState(null);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data from both endpoints concurrently
        const [fetchedCourses, fetchedClasses] = await Promise.all([
          getDashboardCourses(accessToken),
          getUpcomingClasses(accessToken),
        ]);

        // Store the results in state
        setCourses(fetchedCourses);
        setUpcomingClasses(fetchedClasses);
        // if (!authData?.account_activated) {
        // bottomSheetRef.current?.expand();
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data has been fetched or an error occurs
      }
    };
    const handleCategories = async () => {
      try {
        const response = await fetchCategories(accessToken);
        console.log(response.data, "categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleCategories();
    fetchData();
  }, []);

  const categoryOptions = categories?.map((category) => ({
    label: category.category_name,
    value: category.id,
  }));

  return (
    <View style={styles.container}>
      <HeaderWithUsername
        profileImage={authData?.profile_image}
        name={authData?.name}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <CourseSection courses={courses} />
          <AssignmentSection />
          <InformationBoardSection upcomingClasses={upcomingClasses} />
        </ScrollView>
      )}
      {/* <HomeBottomSheet
        categoryOptions={categoryOptions}
        bottomSheetRef={bottomSheetRef}
      /> */}

      <StatusBar style="light" backgroundColor={theme.colors.primary} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
