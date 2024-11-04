import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { Course } from "~/components";
import { searchForCourse, searchForTutors } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import {
  HeaderWithSearchBar,
  ScreenHeaderWithSearchBarAndBack,
} from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Search = (props: Props) => {
  const { query } = useLocalSearchParams<any>();
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;
  const [searchLoading, setSearchLoading] = useState(true); // Global loading state
  const [searchQuery, setSearchQuery] = useState(""); // Store search query
  const [courses, setCourses] = useState<any[]>([]); // Store course results
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(query);

    handleSearch(query);
  }, [accessToken]); // Re-run effect if accessToken changes
  // if (searchResult.length === 0) {
  //   console.log("No courses found");
  // }

  const handleSearch = async (query: string) => {
    if (!accessToken) return; // Ensure token is available

    setSearchLoading(true); // Show loading spinner for search

    try {
      setSearchQuery(query);
      const data = await searchForTutors(query, accessToken); // Perform search
      const searchResult = data[0].data || []; // Extract result from response
      console.log(searchResult);
      setCourses(searchResult); // Update courses with search result

      if (searchResult.length === 0) {
        console.log("No courses found");
      }
    } catch (err) {
      console.error("Error during search:", err);
    } finally {
      setSearchLoading(false); // Stop search loading
    }
  };

  console.log(query);
  return (
    <View style={styles.container}>
      <ScreenHeaderWithSearchBarAndBack
        title="tutors"
        onSearch={handleSearch}
      />

      {searchLoading || searchLoading ? ( // Show loader for initial load or search
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : courses.length > 0 ? ( // If courses are found, render them
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text
            style={{
              paddingBottom: 16,
            }}
            variant="italic"
          >
            Tutor Search results for {query}
          </Text>
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Course course={item} />}
            contentContainerStyle={styles.container}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        </View>
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

export default Search;

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
