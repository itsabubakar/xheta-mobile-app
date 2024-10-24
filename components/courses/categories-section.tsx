import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";

import Course from "./course";

import { Art, Science, Technology } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  courses: { data: any[] }; // Adjust the type based on your course structure
};

const CategoriesSection = ({ courses }: Props) => {
  // State to track the currently active category
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Categories List
  const categories = ["All", "Technology", "Art", "Science"];

  // Function to render icons based on category name
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology":
        return <Technology />;
      case "Art":
        return <Art />;
      case "Science":
        return <Science />;
      default:
        return null;
    }
  };

  // Filter courses based on the active category
  const filteredCourses =
    activeCategory === "All"
      ? courses.data
      : courses?.data?.filter((course) => course.category === activeCategory);

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
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryItem,
              activeCategory === category && styles.activeCategoryItem,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            {renderCategoryIcon(category)}
            <Text
              variant="md"
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* FlatList to render the courses */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Course course={item} />}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
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
    flexDirection: "row",
    columnGap: 10,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});
