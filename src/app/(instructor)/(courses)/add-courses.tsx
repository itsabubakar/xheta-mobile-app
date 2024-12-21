import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, FileIcon } from "~/assets/icons";
import { info } from "~/assets/images";
import { createCourse } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledDropdown, ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;

const AddCourses = (props: Props) => {
  const router = useRouter();
  const [showModuleCreationModal, setCourseModuleModal] = useState(false);
  const [showCourseCreated, setShowCourseCreated] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const [createdCourseId, setCreatedCourseId] = useState("");

  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      course_name: "",
      category_id: 1,
      course_price: "",
      course_level: "",
      certificate: "",
      course_description: "",
      course_image: "",
      course_duration: "",
      course_intro_video: "",
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
        console.log("Selected Image:", file);
      } else {
        setValue("course_intro_video", file); // Set video file to the form
        console.log("Selected Video:", file);
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

    // Create FormData for proper image upload
    const formData = new FormData();

    formData.append("course_name", course_name);
    formData.append("category_id", "1");
    formData.append("course_price", course_price);
    formData.append("course_level", course_level);
    formData.append("certificate", certificate);
    formData.append("course_description", course_description);
    formData.append("course_duration", course_duration);

    // Append the image file if available
    if (course_image) {
      formData.append("course_image", course_image);
    }
    // Append the image file if available
    if (course_intro_video) {
      formData.append("course_intro_video", course_intro_video);
    }

    console.log("Submitting FormData...", formData);
    setLoading(true);
    try {
      const res = await createCourse(accessToken, formData);
      // reset();
      console.log("Course created:", res);
      setCreatedCourseId(res?.data?.id);
      setShowCourseCreated(true);
      setLoading(false);
      console.log(createdCourseId, "created course id");
    } catch (error: any) {
      setLoading(false);

      console.error("Error creating course:", error.response?.data || error);
    }
  };

  const showAddModules = () => {
    setShowCourseCreated(false);
    setCourseModuleModal(true);
  };

  const handleRoutingBack = () => {
    setCourseModuleModal(false);
    // setShowDraftCreated(false);
    router.replace({
      pathname: "/(courses)/courses",
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
      <ScreenHeader bg title="Add Courses" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View>
          <Text>Course thumbnail</Text>

          <Pressable
            onPress={() => pickMedia("Images")}
            style={styles.imagePicker}
          >
            {watch("course_image") ? (
              <Image
                source={{ uri: watch("course_image").uri }} // Extract the `uri` field
                style={styles.imagePreview}
              />
            ) : (
              <View style={styles.placeholderContainer}>
                <FileIcon />
                <Text style={styles.placeholderText}>
                  Click to upload an image
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={{ marginTop: 16 }}>
          <ControlledInput
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
            control={control}
            label="Course category"
            rules={{
              required: "Name is required",
            }}
            options={[
              { label: "UI/UX Design", value: "uI/UX Design" },
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
            {watch("course_intro_video") ? (
              <Text>Video selected: {watch("course_intro_video").name}</Text>
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
              placeholder="Enter description"
              name="course_description"
              control={control}
              label="Course description"
            />
          </View>
        </View>
        <Button onPress={handleSubmit(onSubmit)} label="Publish" />
      </ScrollView>
      <Modal isVisible={showModuleCreationModal}>
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
            <Pressable onPress={() => setCourseModuleModal(false)}>
              <CircleX />
            </Pressable>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Image source={info} />
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingBottom: 4 }}
          >
            Course creation
          </Text>
          <Text style={{ textAlign: "center", paddingBottom: 24 }}>
            Would you like to add course modules or save for later?
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button
              onPress={handleRoutingBack}
              variant="lightPrimary"
              label="Save for later"
              width="48%"
            />
            <Button
              onPress={() =>
                router.replace({
                  pathname: "/add-modules",
                  params: { id: createdCourseId },
                })
              }
              width="48%"
              label="Add modules"
              fontFamily="AeonikMedium"
            />
          </View>
        </View>
      </Modal>
      <Modal isVisible={showCourseCreated}>
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
            <Pressable onPress={showAddModules}>
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
            Your course has been created successfully
          </Text>

          <Button
            onPress={showAddModules}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddCourses;

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
});
