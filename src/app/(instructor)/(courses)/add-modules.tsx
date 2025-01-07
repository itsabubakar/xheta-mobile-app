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
  Image,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, FileIcon } from "~/assets/icons";
import { addModule } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type Props = object;

const AddModules = (props: Props) => {
  const { id }: { id: any } = useLocalSearchParams();
  const router = useRouter();

  console.log(id);

  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const [document, setDocument] = useState<{
    name: string;
    uri: string;
    size: number;
    type: string;
  } | null>(null);
  const [showModulesCreated, setShowModulesCreated] = useState(false);

  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      lesson_number: "",
      module_title: "",
      module_sub_title: "",
      lesson_material_thumbnail: "",
      lesson_material_note: "",
      lesson_material_video: "",
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
        setValue("lesson_material_thumbnail", file); // Set image file to the form
        console.log("Selected Image:", file);
      } else {
        setValue("lesson_material_video", file); // Set video file to the form
        console.log("Selected Video:", file);
      }
    }
  };

  const onSubmit = async (data: any) => {
    const {
      lesson_number,
      module_title,
      module_sub_title,
      lesson_material_thumbnail,
      lesson_material_note,
      lesson_material_video,
    } = data;

    // Create FormData for proper image upload
    const formData = new FormData();

    formData.append("lesson_number", lesson_number);
    formData.append("module_title", module_title);
    formData.append("module_sub_title", module_sub_title);
    formData.append("lesson_material_thumbnail", lesson_material_thumbnail);
    formData.append("lesson_material_note", lesson_material_note);
    formData.append("lesson_material_video", lesson_material_video);

    console.log("Submitting FormData...", formData);
    setLoading(true);
    try {
      const res = await addModule(accessToken, id, formData);
      // reset();
      console.log("Course created:", res);
      setShowModulesCreated(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.response?.data?.message);
      console.log(
        "Error creating course:",
        error.response?.data.message || error,
      );
    }
  };

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
        setDocument({
          name: document.name, // File name
          uri: document.uri, // File URI
          size: document.size || 0, // File size in bytes
          type: document.mimeType || "Unknown", // MIME type or fallback
        });

        setValue("lesson_material_note", file);

        console.log("Picked document:", document);
      } else {
        console.error("No document was selected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
      console.error("Error picking document:", error);
    }
  };

  const handleRouting = () => {
    router.replace({
      pathname: "/(courses)/course-detail",
      params: { id },
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
      <ScreenHeader bg title="Add module" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View>
          <ControlledInput
            name="lesson_number"
            control={control}
            label="Lesson"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
          />
        </View>
        <View>
          <ControlledInput
            name="module_title"
            control={control}
            label="Module title"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
          />
        </View>
        <View>
          <ControlledInput
            name="module_sub_title"
            control={control}
            label="Sub module title"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
          />
        </View>
        <View>
          <Text>Course material thumbnail</Text>
          <Pressable
            onPress={() => pickMedia("Images")}
            style={styles.imagePicker}
          >
            {watch("lesson_material_thumbnail") ? (
              <Image
                source={{ uri: watch("lesson_material_thumbnail").uri }} // Extract the `uri` field
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
        <View style={{ marginTop: 8 }}>
          <Text>Course material video</Text>
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
            {watch("lesson_material_video") ? (
              <Text>Video selected: {watch("lesson_material_video").name}</Text>
            ) : (
              <>
                <FileIcon />
                <Text style={{ textAlign: "center" }}>
                  Click to upload a video
                </Text>
              </>
            )}
          </Pressable>
        </View>
        <View style={{ marginTop: 8, marginBottom: 24 }}>
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
            {watch("lesson_material_note") ? ( // Assuming `document` is the state where the picked document is stored
              <Text>{watch("lesson_material_note").name}</Text>
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

        <Button onPress={handleSubmit(onSubmit)} label="Publish" />
      </ScrollView>
      <Modal isVisible={showModulesCreated}>
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
            Your module has been created successfully
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button
              onPress={() => {
                reset();
                setShowModulesCreated(false);
              }}
              variant="lightPrimary"
              label="Add More modules"
              // width="50%"
            />
            <Button
              onPress={handleRouting}
              label="Go to course"
              fontFamily="AeonikMedium"
              width="48%"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    minHeight: 50, // Ensure consistent height
    position: "relative",
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
