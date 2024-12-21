import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
import { createBootCamp } from "~/src/api/tutor-bootcamps";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledTextArea } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";
import { convertTo24HourFormat } from "~/utils/convertTo24HourFormat";

type Props = object;

const AddBootCamp = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: "",
      coverImage: "",
      price: "",
    },
  });
  const router = useRouter();
  const [showBootCampCreated, setShowBootCampCreated] = useState(false);
  const [showDraftCreated, setShowDraftCreated] = useState(false);

  const [datePicker, setDatePicker] = useState<{
    show: boolean;
    mode: "date" | "time";
    field: string | null;
  }>({
    show: false,
    mode: "date",
    field: null,
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handle Date Picker Change
  const handleDateChange = (event: any, date?: Date) => {
    // Check if the picker was dismissed
    if (event.type === "dismissed") {
      setDatePicker({ show: false, mode: "date", field: null });
      return; // Do nothing if cancelled
    }

    // Close the picker immediately
    setDatePicker({ show: false, mode: "date", field: null });

    // Update selected date or time if a valid date is provided
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Display AM/PM format
      });

      if (datePicker.field) {
        if (datePicker.mode === "date") {
          setValue(datePicker.field, formattedDate); // Set the selected date
        } else {
          setValue(datePicker.field, formattedTime); // Set the selected time with AM/PM
        }
      }
      setSelectedDate(date);
    }
  };

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

      // Check MIME type or fallback to default
      const imageType = mimeType || "image/jpeg";

      // Set as file-like object for form submission
      const imageFile = {
        uri,
        type: imageType,
        name: `cover.${imageType.split("/")[1]}`, // Extract extension from MIME
      };

      setValue("coverImage", imageFile); // Pass the imageFile to the form
      console.log("Selected Image:", imageFile);
    }
  };

  const onSubmit = async (data: any) => {
    const {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      description,
      coverImage,
      price,
    } = data;

    // Create FormData for proper image upload
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("start_time", convertTo24HourFormat(startTime));
    formData.append("end_time", convertTo24HourFormat(endTime));
    formData.append("number_of_participants", "UNLIMITED");

    // Append the image file if available
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    console.log("Submitting FormData...", formData);
    setLoading(true);
    try {
      const res = await createBootCamp(accessToken, formData);
      reset();
      console.log("Bootcamp created:", res);
      setShowBootCampCreated(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      console.error("Error creating bootcamp:", error.response?.data || error);
    }
  };

  const handleRoutingBack = () => {
    setShowBootCampCreated(false);
    setShowDraftCreated(false);
    router.replace({
      pathname: "/bootcamp",
      params: { refetch: "true" }, // Add a refetch query param
    });
  };

  const saveDraft = async (data: any) => {
    try {
      // Get the existing drafts from SecureStore
      const existingDrafts = await SecureStore.getItemAsync("bootcamp_drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];

      // Add the new draft with a unique ID and a "draft" property
      const newDraft = { id: Date.now(), isDraft: true, ...data };
      drafts.push(newDraft);

      // Save the updated drafts back to SecureStore
      await SecureStore.setItemAsync("bootcamp_drafts", JSON.stringify(drafts));

      setShowDraftCreated(true);
      console.log("Draft saved:", newDraft);
    } catch (error) {
      console.error("Failed to save draft:", error);
      Alert.alert("Error", "Failed to save draft. Please try again.");
    }
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
      <ScreenHeader bg title="Add bootcamp" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View style={{ marginTop: 16 }}>
          <ControlledInput
            name="title"
            control={control}
            label="Title"
            rules={{
              required: "title is required",
            }}
            placeholder="Nil"
          />
        </View>

        {/* Start Date & End Date */}
        <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Start Date</Text>
            <Pressable
              style={styles.dateInput}
              onPress={() =>
                setDatePicker({ show: true, mode: "date", field: "startDate" })
              }
            >
              <Text>{watch("startDate") || "Nil"}</Text>
            </Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End Date</Text>
            <Pressable
              style={styles.dateInput}
              onPress={() =>
                setDatePicker({ show: true, mode: "date", field: "endDate" })
              }
            >
              <Text>{watch("endDate") || "Nil"}</Text>
            </Pressable>
          </View>
        </View>
        {/* Start Time & End Time */}
        <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Start Time</Text>
            <Pressable
              style={styles.dateInput}
              onPress={() =>
                setDatePicker({ show: true, mode: "time", field: "startTime" })
              }
            >
              <Text>{watch("startTime") || "Nil"}</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End Time</Text>
            <Pressable
              style={styles.dateInput}
              onPress={() =>
                setDatePicker({ show: true, mode: "time", field: "endTime" })
              }
            >
              <Text>{watch("endTime") || "Nil"}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ marginVertical: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <ControlledTextArea
              placeholder="Enter description"
              name="description"
              control={control}
              label="Course description"
            />
          </View>
          <View>
            <ControlledInput
              name="price"
              placeholder="Price"
              control={control}
              label="Price"
            />
          </View>
          <View style={{ marginVertical: 16 }}>
            <Text style={styles.label}>Cover Image</Text>
            <Pressable onPress={pickImage} style={styles.imagePicker}>
              {watch("coverImage") ? (
                <Image
                  source={{ uri: watch("coverImage").uri }} // Extract the `uri` field
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
        </View>
        <Button onPress={handleSubmit(onSubmit)} label="Create" />
        <View style={{ marginTop: 16 }}>
          <Button
            variant="lightPrimary"
            onPress={handleSubmit(saveDraft)} // Call saveDraft function
            label="Save as draft"
          />
        </View>
      </ScrollView>

      <Modal isVisible={showBootCampCreated}>
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
            Your bootcamp training has been created successfully
          </Text>

          <Button
            onPress={handleRoutingBack}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
      <Modal isVisible={showDraftCreated}>
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
            Your bootcamp training draft has been created successfully
          </Text>

          <Button
            onPress={handleRoutingBack}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
      {/* DateTime Picker */}
      {datePicker.show && (
        <DateTimePicker
          value={selectedDate}
          mode={datePicker.mode} // "date" or "time"
          is24Hour={false} // Enable 12-hour format with AM/PM
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default AddBootCamp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 120,
    height: 120,
  },
  label: {
    color: theme.colors.gray,
    marginBottom: 4,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F7F7F9",
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
  imagePreview: {
    width: "100%",
    height: 150, // Image height
    borderRadius: 8,
    resizeMode: "cover",
  },
});
