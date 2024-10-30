import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Tutor from "./tutor";

import { Art, Science, Technology } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  tutors: { data: any[] };
  categories: any;
};

const TutorsSection = ({ tutors, categories }: Props) => {
  // State to track the currently active category
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [noTutorsMessage, setNoTutorssMessage] = useState<string>(""); // State for no courses message

  // Function to simulate a fetch request for a category
  const fetchCategoryData = async (categorySlug: string) => {
    console.log(`Fetching data for category: ${categorySlug}`);
    setLoading(true); // Set loading state to true
    setNoTutorssMessage(""); // Reset no courses message

    // Simulate a fetch request
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Data fetched for category: ${categorySlug}`);
        resolve(`Fetched data for ${categorySlug}`);
      }, 1000);
    });
  };

  // Function to render icons based on category name // Filter tutors based on the active category
  const filteredTutors =
    activeCategory === "All"
      ? tutors.data
      : tutors?.data?.filter((tutor) => tutor.category === activeCategory);

  // Effect to check for no tutors message
  React.useEffect(() => {
    if (!loading) {
      if (filteredTutors.length === 0 && activeCategory !== "All") {
        setNoTutorssMessage(
          `No courses available in the "${activeCategory}" category.`,
        );
      }
    }
  }, [loading, filteredTutors, activeCategory]);

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
            setNoTutorssMessage(""); // Reset no courses message
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
        data={filteredTutors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Tutor tutor={item} />}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Display no courses message */}
      {noTutorsMessage && <Text variant="subtitle">{noTutorsMessage}</Text>}
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
