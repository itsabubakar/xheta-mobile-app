import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import Tutor from "./tutor";

import { Art, Science, Technology } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = object;

const TutorsSection = (props: Props) => {
  // State to track the currently active category
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Categories List
  const categories = ["All", "Technology", "Art", "Science"];

  // Define the number of courses to render for each category
  const courseCounts: Record<string, number> = {
    All: 24,
    Technology: 7,
    Art: 9,
    Science: 9,
  };

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

      {/* Vertical Scroll Section */}
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 16,
            columnGap: 16,
          }}
        >
          {/* Render the number of courses based on the selected category */}
          {Array.from({ length: courseCounts[activeCategory] }).map(
            (_, index) => (
              <Tutor key={index} />
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TutorsSection;

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
  contentText: {
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});
