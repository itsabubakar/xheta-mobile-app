import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { PlayIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { fetchSingleCourseModule } from "~/src/api/courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const ModuleDetails = (props: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();
  // Handle button click
  const handleButtonClick = () => {
    if (isCompleted) {
      router.replace("/(learner)/module"); // Replace "NextScreen" with your target screen name
    } else {
      setIsCompleted(true);
    }
  };

  const { id, courseId }: { id: string; courseId: string } =
    useLocalSearchParams(); // Pulling the 'params' from the dynamic route

  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;
  const [loading, setLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState<any>(null);

  useEffect(() => {
    if (!accessToken) return;
    if (!id) return;

    const fetchCourseInfo = async () => {
      console.log("fetching", id);
      try {
        setLoading(true);

        const response = await fetchSingleCourseModule(
          accessToken,
          courseId,
          id,
        );
        setCourseInfo(response.data); // Save info to state

        console.log(response.data, "single module info");
      } catch (error) {
        console.error("Error fetching module:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchCourseInfo();
  }, [accessToken]);

  // Show spinner while loading
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Course module" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Container to handle layout */}
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            {/* Breadcrumb Section */}
            <Text style={styles.breadcrumb} variant="md">
              Module 1 {"> "} {courseInfo?.module_title} {"> "}
              {courseInfo?.module_sub_title}
            </Text>

            {/* Image with Play Button */}
            {courseInfo?.lesson_material_video && (
              <View style={styles.imageContainer}>
                <View style={styles.overlay} />
                <Pressable
                  onPress={() => console.log("play button clicked")}
                  style={styles.playIconWrapper}
                >
                  <PlayIcon />
                </Pressable>
                <Image style={styles.image} source={course} />
              </View>
            )}

            {/* Notes Section */}
            <View style={styles.notesContainer}>
              <Text variant="subtitle">Notes</Text>
              <Text style={styles.notesText}>
                Welcome to our UI/UX Design course! This comprehensive program
                will take you through various aspects of designing engaging user
                interfaces...
              </Text>
              {/* Repeat text to make scrollable */}
              <Text style={styles.notesText}>
                Welcome to our UI/UX Design course! This comprehensive program
                will take you through various aspects of designing engaging user
                interfaces...
              </Text>
              <Text style={styles.notesText}>
                Welcome to our UI/UX Design course! This comprehensive program
                will take you through various aspects of designing engaging user
                interfaces...
              </Text>
              <Text style={styles.notesText}>
                Welcome to our UI/UX Design course! This comprehensive program
                will take you through various aspects of designing engaging user
                interfaces...
              </Text>
              <Text style={styles.notesText}>
                Welcome to our UI/UX Design course! This comprehensive program
                will take you through various aspects of designing engaging user
                interfaces...
              </Text>
            </View>
          </View>

          {/* Button at the bottom */}
          <View style={styles.buttonContainer}>
            <Button
              label={isCompleted ? "Proceed" : "Mark as completed"}
              onPress={handleButtonClick}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModuleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16, // To prevent content being cut off
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between", // Pushes content to the top and button to the bottom
    padding: 16,
  },
  content: {
    flexShrink: 1,
  },
  breadcrumb: {
    color: theme.colors.black,
    paddingBottom: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 5,
  },
  playIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
  },
  notesContainer: {
    paddingTop: 16,
  },
  notesText: {
    paddingTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
