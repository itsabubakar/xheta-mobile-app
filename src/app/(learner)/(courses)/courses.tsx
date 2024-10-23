import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { CategoriesSection } from "~/components";
import { fetchCourses } from "~/src/api/auth";
import { useAuthStore } from "~/src/core/storage";
import { HeaderWithSearchBar } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Courses = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [courses, setCourses] = useState<any[]>([]); // Adjust the type as necessary
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      if (!accessToken) return; // Do nothing if there's no token
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching courses..."); // Log before fetching

        const fetchedCourses = await fetchCourses(accessToken);
        setCourses(fetchedCourses); // Set the fetched courses
        console.log(fetchedCourses, "Fetched courses"); // Log the fetched courses
      } catch (err) {
        console.error("Error fetching courses:", err); // Log the error
        setError("Error fetching courses"); // Handle the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getCourses();
  }, [accessToken]); // Re-run effect if accessToken changes

  return (
    <View style={styles.container}>
      <HeaderWithSearchBar
        title="Courses"
        onSearch={(query) => console.log(query)}
      />
      <CategoriesSection />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
