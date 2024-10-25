import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

import { CategoriesSection } from "~/components";
import { fetchCourses, fetchCategories } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithSearchBar } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Courses = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [courses, setCourses] = useState<{ data: any[] }>({ data: [] });
  const [categories, setCategories] = useState<any[]>([]); // New state for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoursesAndCategories = async () => {
      if (!accessToken) return; // Do nothing if there's no token
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching courses and categories...");

        // Fetch courses and categories in parallel
        const [fetchedCourses, fetchedCategories] = await Promise.all([
          fetchCourses(accessToken),
          fetchCategories(accessToken),
        ]);

        setCourses(fetchedCourses); // Set the fetched courses
        setCategories(fetchedCategories); // Set the fetched categories

        // console.log(fetchedCourses, "Fetched courses");
        // console.log(fetchedCategories, "Fetched categories");
      } catch (err) {
        console.error("Error fetching data:", err); // Log the error
        setError("Error fetching data"); // Handle the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getCoursesAndCategories();
  }, [accessToken]); // Re-run effect if accessToken changes

  return (
    <View style={styles.container}>
      <HeaderWithSearchBar
        title="Courses"
        onSearch={(query) => console.log(query)}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <CategoriesSection categories={categories} courses={courses} /> // Pass courses to CategoriesSection
      )}
      {/* You can pass categories to another component or use them in this screen */}
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
