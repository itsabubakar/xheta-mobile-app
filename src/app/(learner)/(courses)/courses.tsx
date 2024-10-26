import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

import { CategoriesSection } from "~/components";
import { fetchCourses, fetchCategories, searchForCourse } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithSearchBar } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Courses = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [courses, setCourses] = useState<any[]>([]); // Store course results
  const [categories, setCategories] = useState<any[]>([]); // Store categories
  const [loading, setLoading] = useState(true); // Global loading state
  const [searchLoading, setSearchLoading] = useState(false); // Loading state for search
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  useEffect(() => {
    const getCoursesAndCategories = async () => {
      if (!accessToken) return; // No token, no request
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching courses and categories...");
        console.log("Fetching courses and categories...");
        console.log("Fetching courses and categories...");
        // Fetch courses and categories in parallel
        const [fetchedCourses, fetchedCategories] = await Promise.all([
          fetchCourses(accessToken),
          fetchCategories(accessToken),
        ]);

        setCourses(fetchedCourses.data || []); // Set fetched courses
        setCategories(fetchedCategories); // Set fetched categories
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getCoursesAndCategories();
  }, [accessToken]); // Re-run effect if accessToken changes

  const handleSearch = async (query: string) => {
    if (!accessToken) return; // Ensure token is available

    setSearchLoading(true); // Show loading spinner for search
    setError(null);

    try {
      console.log(`Searching for course: ${query}`);
      setSearchQuery(query);
      const data = await searchForCourse(query, accessToken); // Perform search
      const searchResult = data[0]?.data || []; // Extract result from response

      setCourses(searchResult); // Update courses with search result

      if (searchResult.length === 0) {
        console.log("No courses found");
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError("Error during search");
    } finally {
      setSearchLoading(false); // Stop search loading
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithSearchBar title="Courses" onSearch={handleSearch} />

      {loading || searchLoading ? ( // Show loader for initial load or search
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : courses.length > 0 ? ( // If courses are found, render them
        <CategoriesSection
          categories={categories}
          courses={{ data: courses }}
        />
      ) : (
        // If no courses found, show message
        <View style={styles.noCoursesContainer}>
          <Text style={styles.noCoursesText}>
            No courses for {searchQuery} found.
          </Text>
        </View>
      )}
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
  noCoursesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCoursesText: {
    fontSize: 18,
    color: theme.colors.gray,
  },
});
