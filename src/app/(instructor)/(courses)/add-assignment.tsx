import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, FileIcon } from "~/assets/icons";
import { addCourseAssignment } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;

const AddAssignments = (props: Props) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<any>({
    defaultValues: {
      lesson_id: "",
      title: "",
      description: "",
      note: "",
    },
  });
  const [assignmentDocument, setAssignmentDocument] = useState<any>({});
  const router = useRouter();
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const { lessonOptions }: { lessonOptions: any } = useLocalSearchParams();
  const parsedLessonOptions = lessonOptions ? JSON.parse(lessonOptions) : [];
  const [showAssignmentCreated, setShowAssignmentCreated] = useState(false);

  console.log(parsedLessonOptions, "parsed lessons");

  // console.log(lessonOptions);
  const openDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
        copyToCacheDirectory: true, // Cache the document temporarily
      });

      console.log(result);

      // Check if the operation was canceled
      if (result.canceled) {
        console.log("Document picking cancelled.");
        return;
      }

      // Get the first asset (if multiple selections are enabled in the future, handle accordingly)
      const document = result.assets[0];

      if (document) {
        const file = {
          name: document.name, // File name
          uri: document.uri, // File URI
          size: document.size || 0, // File size in bytes
          type: document.mimeType || "Unknown", // MIME type or fallback
        };
        // Assuming you have a state setter function for storing the document
        setAssignmentDocument({
          name: document.name, // File name
          uri: document.uri, // File URI
          size: document.size || 0, // File size in bytes
          type: document.mimeType || "Unknown", // MIME type or fallback
        });

        setValue("note", file);

        console.log("Picked document:", file);
      } else {
        console.error("No document was selected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
      console.error("Error picking document:", error);
    }
  };
  const handleLessonChange = (lesson_number: any) => {
    // Convert the lesson_number input to a pure number (e.g., "Lesson 01" -> 1)
    const lessonNumber = parseInt(lesson_number.replace(/\D/g, ""), 10); // Remove non-digit characters and parse as integer

    // Find the lesson that matches the given numeric lesson_number
    const selectedLesson = parsedLessonOptions.find(
      (lesson: any) =>
        parseInt(lesson.lesson_number.replace(/\D/g, ""), 10) === lessonNumber,
    );

    if (selectedLesson) {
      // Return the lesson id directly
      return selectedLesson.id;
    } else {
      // If no matching lesson is found, return null or a default value
      return null;
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const lessonId = handleLessonChange(data.lesson_id);

    console.log(data);

    const { title, note, description } = data;
    const formData = new FormData();
    formData.append("      title", title);
    formData.append("note", note);
    formData.append("description", description);
    formData.append("lesson_id", lessonId);

    if (lessonId) {
      console.log("Selected Lesson ID:", lessonId);
      try {
        // Use `lessonId` for lesson_id in submission
        const res = await addCourseAssignment(accessToken, lessonId, formData);
        console.log(res);
        setShowAssignmentCreated(true);
      } catch (error: any) {
        console.error(error.response.data);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No valid lesson selected");
    }
  };

  const handleRouting = () => {
    setShowAssignmentCreated(false);

    router.back();
  };

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
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Add assignment" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <ControlledInput
              name="lesson_id"
              control={control}
              label="Lesson"
              rules={{
                required: "Lesson ID is required",
              }}
              placeholder="Nil"
            />
          </View>
          <View>
            <ControlledInput
              name="title"
              control={control}
              label="Assignment title"
              rules={{
                required: "Title is required",
              }}
              placeholder="Nil"
            />
          </View>
          <ControlledTextArea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter a short description..."
          />

          <View>
            <Text>Course material note</Text>
            <Pressable
              onPress={openDocumentPicker}
              style={{
                backgroundColor: theme.colors.lightGray,
                borderColor: theme.colors.borderColor,
                borderWidth: 2,
                borderRadius: 4,
                marginTop: 6,
                padding: 12,
                borderStyle: "dashed",
                justifyContent: "center",
                alignItems: "center",
                rowGap: 8,
              }}
            >
              {watch("note") ? (
                <Text>{watch("note").name}</Text>
              ) : (
                <>
                  <FileIcon />
                  <Text style={{ textAlign: "center" }}>
                    Click to upload a document
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 16,
          }}
        >
          <Button onPress={handleSubmit(onSubmit)} label="Add assignment" />
        </View>
      </ScrollView>
      <Modal isVisible={showAssignmentCreated}>
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={handleRouting}>
              <CircleX />
            </Pressable>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <LottieView
                style={styles.lottie}
                source={greenTick}
                autoPlay
                loop={false}
              />
            </View>
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingBottom: 16 }}
          >
            Your assignment has been added successfully
          </Text>
          <Button
            onPress={handleRouting}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddAssignments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
