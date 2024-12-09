import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Pressable } from "react-native";

import LearningsCourseCard from "./learning-course-card";

import { Text, theme } from "~/theme";

type Props = {
  activeTab: string;
};

const LearningSection = ({ activeTab }: Props) => {
  const [courseTab, setCourseTab] = useState("Courses"); // New state for the top tabs

  useEffect(() => {
    console.log("hello");
  }, [courseTab]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Course Content */}
      <ScrollView>
        {/* Top Tab Buttons (Courses and Personalized) */}
        <View style={styles.topTabsContainer}>
          {["Courses", "Personalized"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setCourseTab(tab)}
              style={[
                styles.tabButton,
                courseTab === tab && styles.activeTabButton, // Apply active border style
              ]}
            >
              <Text
                variant="md"
                style={[
                  styles.tabText,
                  courseTab === tab ? { color: theme.colors.primary } : {},
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "Ongoing" ? (
          <View style={styles.courseCardContainer}>
            {/* Show different course cards based on the active courseTab */}

            {courseTab === "Courses" ? (
              <>
                <LearningsCourseCard progressPercent={10} />
                <LearningsCourseCard progressPercent={40} />
                <LearningsCourseCard progressPercent={60} />
              </>
            ) : (
              <>
                <LearningsCourseCard
                  route="/(learnings)/personalized-details"
                  progressPercent={10}
                />
                <LearningsCourseCard
                  route="/(learnings)/personalized-details"
                  progressPercent={10}
                />
              </>
            )}
          </View>
        ) : (
          <View style={styles.courseCardContainer}>
            {/* Show different course cards based on the active courseTab */}
            {courseTab === "Courses" ? (
              <>
                <LearningsCourseCard progressPercent={100} />
                <LearningsCourseCard progressPercent={100} />
                <LearningsCourseCard progressPercent={100} />
              </>
            ) : (
              <>
                <LearningsCourseCard progressPercent={100} />
                <LearningsCourseCard progressPercent={100} />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LearningSection;

const styles = StyleSheet.create({
  topTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "transparent",
    flex: 1,
  },
  activeTabButton: {
    borderColor: theme.colors.primary, // Show primary border on active tab
  },
  tabText: {
    color: theme.colors.black,
    textAlign: "center",
  },
  courseCardContainer: {
    rowGap: 16,
  },
});
