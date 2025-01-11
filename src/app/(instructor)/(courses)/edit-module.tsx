import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
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
import {
  addModule,
  editModule,
  singleCourseDetail,
  singleModuleDetail,
} from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { Text, theme } from "~/theme";

type Props = object;

const EditModule = (props: Props) => {
  const { id, courseId }: { id: any; courseId: any } = useLocalSearchParams();
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const [document, setDocument] = useState<{
    name: string;
    uri: string;
    size: number;
    type: string;
  } | null>(null);
  const [showModulesEdited, setShowModulesEdited] = useState(false);
  const [moduleData, setModuleData] = useState<any>(null);

  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      lesson_number: "",
      module_title: "",
      module_sub_title: "",
      lesson_material_thumbnail: null,
      lesson_material_note: null,
      lesson_material_video: null,
    },
  });

  const fetchModuleData = async () => {
    setLoading(true);
    try {
      const res = await singleModuleDetail(accessToken, id as string);
      console.log(res.data);
      setModuleData(res.data);
    } catch (error: any) {
      console.error("Failed to fetch course:", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  useEffect(() => {
    if (moduleData) {
      // Update form fields with fetched data
      reset({
        lesson_number: moduleData.lesson_number?.toString() || "",
        module_title: moduleData.module_title || "",
        module_sub_title: moduleData.module_sub_title || "",
        lesson_material_thumbnail: moduleData.lesson_material_thumbnail || null,
        lesson_material_note: moduleData.lesson_material_note || null,
        lesson_material_video: moduleData.lesson_material_video || null,
      });
    }
  }, [moduleData, reset]);

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
    data.lesson_number = Number(data.lesson_number);
    // Function to compare the current data with the original moduleData
    const getModifiedFields = (newData: any, originalData: any) => {
      const modifiedFields: any = {};

      for (const key in newData) {
        if (newData[key] !== originalData[key]) {
          modifiedFields[key] = newData[key];
        }
      }

      return modifiedFields;
    };

    // Get the modified fields
    const modifiedFields = getModifiedFields(data, moduleData);

    // Check if there are any changes
    if (Object.keys(modifiedFields).length === 0) {
      Alert.alert("No changes", "You haven't made any modifications.");
      return;
    }

    // Create FormData and append only modified fields
    const formData = new FormData();
    for (const key in modifiedFields) {
      if (
        key === "lesson_material_thumbnail" ||
        key === "lesson_material_video" ||
        key === "lesson_material_note"
      ) {
        // Handle file uploads
        const file = modifiedFields[key];
        if (file?.uri) {
          // @ts-ignore
          formData.append(key, {
            uri: file.uri,
            type: file.type || "application/octet-stream", // Default MIME type
            name: file.name || "file", // Default file name
          });
        }
      } else {
        formData.append(key, modifiedFields[key]);
      }
    }

    console.log("Submitting modified fields:", formData);
    setLoading(true);

    try {
      const res = await editModule(accessToken, id, formData);
      console.log("module updated:", res);
      setShowModulesEdited(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.response?.data?.message || "An error occurred.");
      console.log("Error updating course:", error.response || error);
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
      pathname: "/course-detail",
      params: { id: courseId },
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
        title="Edit module"
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View>
          <ControlledInput
            disabled={!edit}
            name="lesson_number"
            control={control}
            label="Lesson"
            type="number"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
          />
        </View>
        <View>
          <ControlledInput
            disabled={!edit}
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
            disabled={!edit}
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
            onPress={() => {
              if (edit) pickMedia("Images");
            }}
            style={styles.imagePicker}
          >
            {watch("lesson_material_thumbnail") ? (
              <Image
                source={{ uri: watch("lesson_material_thumbnail") }} // Extract the `uri` field
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
            onPress={() => {
              if (edit) pickMedia("Videos");
            }}
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
              <Text>Video selected: {watch("lesson_material_video")}</Text>
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
            onPress={() => {
              if (edit) openDocumentPicker();
            }}
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
              <Text>{watch("lesson_material_note")}</Text>
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

        {edit && (
          <Button onPress={handleSubmit(onSubmit)} label="Publish changes" />
        )}
      </ScrollView>
      <Modal isVisible={showModulesEdited}>
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
            Your module changes has been added successfully
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

export default EditModule;

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
