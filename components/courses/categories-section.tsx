import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Course from "./course";

import { Text, theme } from "~/theme";

type Props = {
  courses: { data: any[] };
  categories: any;
};

const CategoriesSection = ({ courses, categories }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [noCoursesMessage, setNoCoursesMessage] = useState<string>(""); // State for no courses message

  // Function to simulate a fetch request for a category
  const fetchCategoryData = async (categorySlug: string) => {
    console.log(`Fetching data for category: ${categorySlug}`);
    setLoading(true); // Set loading state to true
    setNoCoursesMessage(""); // Reset no courses message

    // Simulate a fetch request
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Data fetched for category: ${categorySlug}`);
        resolve(`Fetched data for ${categorySlug}`);
      }, 1000);
    });
  };

  // Filter courses based on the active category
  const filteredCourses =
    activeCategory === "All"
      ? courses.data
      : courses?.data?.filter((course) => course.category === activeCategory);

  // Effect to check for no courses message
  React.useEffect(() => {
    if (!loading) {
      if (filteredCourses.length === 0 && activeCategory !== "All") {
        setNoCoursesMessage(
          `No courses available in the "${activeCategory}" category.`,
        );
      }
    }
  }, [loading, filteredCourses, activeCategory]);

  return (
    <View>
      <Text style={styles.header} variant="subtitle">
        Categories
      </Text>

      {/* Horizontal Scroll Section */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          style={[
            styles.categoryItem,
            activeCategory === "All" && styles.activeCategoryItem,
          ]}
          onPress={() => {
            setActiveCategory("All");
            setNoCoursesMessage(""); // Reset no courses message
          }}
        >
          <Text
            variant="md"
            style={[
              styles.categoryText,
              activeCategory === "All" && styles.activeCategoryText,
            ]}
          >
            All
          </Text>
        </Pressable>

        {categories.data.map((category: any) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryItem,
              activeCategory === category.category_name &&
                styles.activeCategoryItem,
            ]}
            onPress={async () => {
              setActiveCategory(category.category_name); // Set the active category
              await fetchCategoryData(category.category_slug); // Fetch data for the selected category
              setLoading(false); // Reset loading state after fetch
            }}
          >
            <Text
              variant="md"
              style={[
                styles.categoryText,
                activeCategory === category.category_name &&
                  styles.activeCategoryText,
              ]}
            >
              {category.category_name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Display loading indicator */}
      {loading && (
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {/* FlatList to render the courses */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Course course={item} />}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Display no courses message */}
      {noCoursesMessage && (
        <Text variant="subtitle" style={styles.noCoursesText}>
          {noCoursesMessage}
        </Text>
      )}
    </View>
  );
};

export default CategoriesSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 240,
  },
  header: {
    paddingBottom: 12,
    paddingTop: 24,
    paddingLeft: 16,
  },
  horizontalScroll: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 8,
    marginRight: 8,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: "center",
  },
  activeCategoryItem: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: "#333",
  },
  activeCategoryText: {
    color: "#ffffff",
  },
  noCoursesText: {
    textAlign: "center",
    color: theme.colors.black,
    paddingHorizontal: 16,
  },
});
