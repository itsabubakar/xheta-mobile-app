import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import { CategoriesSection, TutorsSection } from "~/components";
import { fetchCategories, fetchTutors, searchForTutors } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithSearchBar } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Tutors = (props: Props) => {
  const router = useRouter();
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [tutors, setTutors] = useState<any[]>([]); // Store course results
  const [categories, setCategories] = useState<any[]>([]); // Store categories
  const [loading, setLoading] = useState(true); // Global loading state
  const [searchLoading, setSearchLoading] = useState(false); // Loading state for search
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  useEffect(() => {
    const getTutorsAndCategories = async () => {
      if (!accessToken) return; // No token, no request
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching tutors and categories...");
        // Fetch tutors and categories in parallel
        const [fetchedTutors, fetchedCategories] = await Promise.all([
          fetchTutors(accessToken),
          fetchCategories(accessToken),
        ]);
        setTutors(fetchedTutors.data || []); // Set fetched tutors
        console.log(fetchedTutors.data, "tutors");
        setCategories(fetchedCategories); // Set fetched categories
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getTutorsAndCategories();
  }, [accessToken]); // Re-run effect if accessToken changes

  const handleSearch = async (query: string) => {
    if (!accessToken) return; // Ensure token is available

    setSearchLoading(true); // Show loading spinner for search
    setError(null);

    try {
      console.log(`Searching for tutor: ${query}`);
      router.push("/search-tutor");
      router.setParams({ query });
    } catch (err) {
      console.error("Error during search:", err);
      setError("Error during search");
    } finally {
      setSearchLoading(false); // Stop search loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderWithSearchBar
          placeholder="Search for tutors..."
          title="Tutors"
          onSearch={handleSearch}
        />

        {loading || searchLoading ? ( // Show loader for initial load or search
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : error ? (
          <View>
            <Text>{error}</Text>
          </View>
        ) : tutors.length > 0 ? ( // If tutors are found, render them
          <TutorsSection categories={categories} tutors={{ data: tutors }} />
        ) : (
          // If no tutors found, show message
          <View style={styles.noCoursesContainer}>
            <Text style={styles.noCoursesText}>
              No tutors for {searchQuery} found.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Tutors;

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
