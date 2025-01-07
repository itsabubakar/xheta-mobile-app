import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View, Alert, ScrollView } from "react-native";

import { FileIcon } from "~/assets/icons";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;

const AddAssignments = (props: Props) => {
  const {
    control,
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
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to grant camera roll permission to upload a picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, mimeType } = result.assets[0];
      console.log(uri);
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
        setAssignmentDocument({
          name: document.name, // File name
          uri: document.uri, // File URI
          size: document.size || 0, // File size in bytes
          type: document.mimeType || "Unknown", // MIME type or fallback
        });

        setValue("note", file);

        console.log("Picked document:", document);
      } else {
        console.error("No document was selected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
      console.error("Error picking document:", error);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
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
    </View>
  );
};

export default AddAssignments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
