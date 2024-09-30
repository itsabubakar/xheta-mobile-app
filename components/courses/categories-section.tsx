import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Art, Science, Technology } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = object;

const CategoriesSection = (props: Props) => {
  // State to track the currently active category
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Categories List
  const categories = ["All", "Technology", "Art", "Science"];

  // Sample content for each category
  const categoryContent: Record<string, string[]> = {
    All: ["Item 1", "Item 2", "Item 3", "Item 4"],
    Technology: ["Product A", "Product B", "Product C"],
    Art: ["Service X", "Service Y", "Service Z"],
    Science: ["Content Alpha", "Content Beta"],
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
        {categoryContent[activeCategory].map((item, index) => (
          <Text key={index} style={styles.contentText}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    paddingBottom: 12,
    paddingTop: 24,
    paddingLeft: 16,
  },
  horizontalScroll: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: "row",
    columnGap: 10,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#D2D2D266",
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
