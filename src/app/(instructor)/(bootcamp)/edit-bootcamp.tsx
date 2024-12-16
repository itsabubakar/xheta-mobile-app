import DateTimePicker from "@react-native-community/datetimepicker";
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
import { course } from "~/assets/images";
import { editBootCamp } from "~/src/api/tutor-bootcamps";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import {
  ControlledDropdown,
  ControlledInput,
  ControlledTextArea,
} from "~/src/ui/form/input";
import { Text, theme } from "~/theme";
import { convertTo24HourFormat } from "~/utils/convertTo24HourFormat";

type Props = object;

const EditBootcamp = (props: Props) => {
  const {
    id,
    start_date,
    end_date,
    title,
    price,
    description,
    cover_image,
    formatted_start_time,
    formatted_end_time,
  } = useLocalSearchParams();

  const [edit, setEdit] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const accessToken = authData?.access_token || "";
  const [currentImage, setCurrentImage] = useState<string | any>(cover_image); // Default image
  const [bootCampEdited, setShowBootCampEdited] = useState(false);
  const router = useRouter();

  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      startDate: start_date,
      endDate: end_date,
      title,
      startTime: formatted_start_time,
      endTime: formatted_end_time,
      price,
      description,
      coverImage: cover_image,
    },
  });

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

      // Build an image file-like object
      const imageType = mimeType || "image/jpeg";
      const imageFile = {
        uri,
        type: imageType,
        name: `cover.${imageType.split("/")[1]}`, // Extract extension
      };

      setValue("coverImage", imageFile); // Update form state
      setCurrentImage(uri); // Update state to show new image immediately
      console.log("New Image Selected:", imageFile);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Combine new data with fallback to existing values

    console.log(data.price);
    const finalData = {
      title: data.title || title,
      description: data.description || description,
      price: data.price
        ? Number(data.price.toString().replace(/[^0-9.]/g, "")) // Remove commas and keep valid numbers
        : Number(price), // Fallback to existing price
      start_date: data.startDate || start_date,
      end_date: data.endDate || end_date,
      start_time: data.startTime
        ? convertTo24HourFormat(data.startTime)
        : formatted_start_time,
      end_time: data.endTime
        ? convertTo24HourFormat(data.endTime)
        : formatted_end_time,
      number_of_participants: "UNLIMITED", // Fixed default value
    };

    // Append fields to FormData
    Object.entries(finalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Handle the image: Append only if a new file is selected
    if (data.coverImage && data.coverImage.uri) {
      formData.append("cover_image", {
        uri: data.coverImage.uri,
        name: "cover.jpeg",
        type: "image/jpeg",
      });
    }

    console.log("Submitting FormData:", formData);

    setLoading(true);
    try {
      const res = await editBootCamp(accessToken, id as any, formData);
      console.log("Bootcamp edited successfully!", res);
      reset(); // Reset the form
      setShowBootCampEdited(true);
    } catch (error: any) {
      console.error("Error editing bootcamp:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  const handleRoutingBack = () => {
    setShowBootCampEdited(false);
    setEdit(false);
    router.replace({
      pathname: "/bootcamp",
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
        title="Edit bootcamp"
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <Text style={{ marginBottom: 16 }}>Preview</Text>
        <View style={styles.imageContainer}>
          {edit && <View style={styles.overlay} />}
          {edit && (
            <Pressable style={styles.changeImageButton} onPress={pickImage}>
              <GreenCamera />
              <Text style={styles.changeImageText}>Change image</Text>
            </Pressable>
          )}
          {/* Use currentImage as the source */}
          <Image
            style={styles.image}
            source={{ uri: currentImage || cover_image }}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <ControlledInput
            disabled={!edit}
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
                edit &&
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
                edit &&
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
              onPress={() => {
                if (edit) {
                  setDatePicker({
                    show: true,
                    mode: "time",
                    field: "startTime",
                  });
                }
              }}
            >
              <Text>{watch("startTime") || "Nil"}</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End Time</Text>
            <Pressable
              style={styles.dateInput}
              onPress={() =>
                edit &&
                setDatePicker({ show: true, mode: "time", field: "endTime" })
              }
            >
              <Text>{watch("endTime") || "Nil"}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <ControlledInput
            name="price"
            placeholder="Price"
            control={control}
            label="Price"
            disabled={!edit}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <ControlledTextArea
              disabled={!edit}
              placeholder="Enter description"
              name="description"
              control={control}
              label="Course description"
            />
          </View>
        </View>
        <View>
          <View style={{ paddingTop: 24 }}>
            <Button onPress={handleSubmit(onSubmit)} label="Save" />
          </View>
        </View>
      </ScrollView>
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

      <Modal isVisible={bootCampEdited}>
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
            Your bootcamp training has been edited successfully
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

export default EditBootcamp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  lottie: {
    width: 120,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
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
});
