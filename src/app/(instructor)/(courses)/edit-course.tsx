import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, FileIcon, GreenCamera } from "~/assets/icons";
import { editCourse } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import {
  ControlledDropdown,
  ControlledInput,
  ControlledTextArea,
} from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;

const EditCourse = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [courseEdited, setCourseEdited] = useState<any>(false);
  const router = useRouter();

  const {
    id,
    courseName,
    coursePrice,
    courseImage,
    courseDescription,
    courseDuration,
    courseIntroVideo,
    certificate,
    courseLevel,
  } = useLocalSearchParams<any>();
  const [currentVideo, setCurrentVideo] = useState<string | any>(
    courseIntroVideo,
  );
  const [currentImage, setCurrentImage] = useState<string | any>(courseImage); // Default image
  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      course_name: courseName,
      category_id: 1,
      course_price: coursePrice,
      course_level: courseLevel,
      certificate,
      course_description: courseDescription,
      course_image: courseImage,
      course_duration: courseDuration,
      course_intro_video: courseIntroVideo,
    },
  });

  const pickMedia = async (mediaType = "Images") => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        `You need to grant permission to upload a ${mediaType.toLowerCase()}.`,
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        mediaType === "Images"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9], // Use aspect ratio suitable for videos
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, mimeType } = result.assets[0];
      const fileType =
        mimeType || (mediaType === "Images" ? "image/jpeg" : "video/mp4");

      // Create a file-like object
      const file = {
        uri,
        type: fileType,
        name: `${mediaType.toLowerCase()}_file.${fileType.split("/")[1]}`, // Generate name with extension
      };

      if (mediaType === "Images") {
        setValue("course_image", file); // Set image file to the form
        setCurrentImage(uri); // Update state to show new image immediately
      } else {
        setValue("course_intro_video", file); // Set video file to the form
        setCurrentVideo(file); // Update state for display
      }
    }
  };

  const onSubmit = async (data: any) => {
    const {
      course_name,
      category_id,
      course_price,
      course_level,
      certificate,
      course_description,
      course_image,
      course_duration,
      course_intro_video,
    } = data;

    // Parse the course price to a numeric value
    const numericPrice = parseFloat(course_price.replace(/,/g, ""));

    // Prepare the JSON payload
    const payload = {
      course_name,
      category_id: 1, // Ensure it's a number if the server expects it
      course_price: numericPrice,
      course_level,
      certificate,
      course_description,
      course_duration,
      course_image,
      course_intro_video,
    };

    setLoading(true);
    try {
      const res = await editCourse(accessToken, id, payload);
      setCourseEdited(true);
      setLoading(false);
      console.log(res, " course edited");
    } catch (error: any) {
      setLoading(false);

      console.error(
        "Error creating course:",
        error.response.data?.message || error,
      );
    }
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      // Create a URL object
      const parsedUrl = new URL(url);

      // Extract the last part of the path
      const pathname = parsedUrl.pathname;
      const segments = pathname.split("/").filter(Boolean);
      const fileName = segments.pop(); // Get the last segment

      // Validate if the last segment has a file extension
      return fileName && /\.[a-zA-Z0-9]+$/.test(fileName) ? fileName : null;
    } catch (error: any) {
      console.error("Invalid URL:", error.message);
      return null;
    }
  };

  const handleRoutingBack = () => {
    setCourseEdited(false);
    setEdit(false);
    router.replace({
      pathname: "/courses",
      params: { refetch: "true" }, // Add a refetch query param
    });
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
      <ScreenHeader
        editButtonFunction={() => setEdit(true)}
        editIcon={!edit}
        bg
        title="Edit Course"
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View>
          <Text>Course thumbnail</Text>

          <View style={styles.imageContainer}>
            {edit && <View style={styles.overlay} />}
            {edit && (
              <Pressable
                style={styles.changeImageButton}
                onPress={() => pickMedia()}
              >
                <GreenCamera />
                <Text style={styles.changeImageText}>Change image</Text>
              </Pressable>
            )}
            {/* Use currentImage as the source */}
            <Image
              style={styles.image}
              source={{ uri: currentImage || courseImage }}
            />
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <ControlledInput
            disabled={!edit}
            name="course_name"
            control={control}
            label="Course name"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <ControlledDropdown
            name="category_id"
            disabled={!edit}
            control={control}
            label="Course category"
            rules={{
              required: "Name is required",
            }}
            options={[
              { label: "UI/UX Design", value: 1 },
              {
                label: "Frontend Development",
                value: "frontend Development",
              },
              {
                label: "Backend Development",
                value: "backend Development",
              },
              { label: "Data Analytics", value: "data Analytics" },
              { label: "Data Science", value: "data Science" },
              { label: "Product Management", value: "product Management" },
            ]}
          />
        </View>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            columnGap: 16,
            flex: 1,
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              disabled={!edit}
              name="course_price"
              control={control}
              label="Course price"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              disabled={!edit}
              name="course_duration"
              control={control}
              label="Course duration"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            columnGap: 16,
            flex: 1,
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              disabled={!edit}
              name="certificate"
              control={control}
              label="Certificate"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              disabled={!edit}
              name="course_level"
              control={control}
              label="Level"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text>Course intro video</Text>
          <Pressable
            onPress={() => pickMedia("Videos")}
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
            {currentVideo ? (
              <Text>
                Video selected:{" "}
                {typeof currentVideo === "string"
                  ? getFileNameFromUrl(currentVideo)
                  : currentVideo.name}
              </Text>
            ) : (
              <>
                <FileIcon />
                <Text style={{ textAlign: "center" }}>
                  Click to upload a video
                </Text>
              </>
            )}
          </Pressable>
          <View style={{ marginVertical: 16 }}>
            <ControlledTextArea
              disabled={!edit}
              placeholder="Enter description"
              name="course_description"
              control={control}
              label="Course description"
            />
          </View>
        </View>

        {edit && (
          <Button onPress={handleSubmit(onSubmit)} label="Save changes" />
        )}
      </ScrollView>

      <Modal isVisible={courseEdited}>
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
            <Pressable onPress={handleRoutingBack}>
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
            Your course changes has been effected successfully
          </Text>

          <Button
            onPress={handleRoutingBack}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
    </View>
  );
};

export default EditCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 120,
    height: 120,
  },
  imagePreview: {
    width: "100%",
    height: 150, // Image height
    borderRadius: 8,
    resizeMode: "cover",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 8,
  },
  placeholderText: {
    textAlign: "center",
    color: theme.colors.gray,
    fontSize: 14,
  },
  imagePicker: {
    backgroundColor: theme.colors.lightGray,
    borderColor: theme.colors.borderColor,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 6,
    padding: 12,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150, // Ensure consistent height
    position: "relative",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // To layer items
    width: "100%",
    height: 200, // Adjust to your image height
  },
  changeImageButton: {
    position: "absolute",
    backgroundColor: "#FFFFFF", // Semi-transparent background
    zIndex: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 8,
  },
  changeImageText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    borderRadius: 8,
    zIndex: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
