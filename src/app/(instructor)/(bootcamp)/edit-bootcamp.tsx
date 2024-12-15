import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { FileIcon, GreenCamera } from "~/assets/icons";
import { course } from "~/assets/images";
import { Button, ScreenHeader } from "~/src/ui";
import {
  ControlledDropdown,
  ControlledInput,
  ControlledTextArea,
} from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;

const EditBootcamp = (props: Props) => {
  const {
    start_date,
    end_date,
    title,
    start_time,
    end_time,
    price,
    description,
    cover_image,
  } = useLocalSearchParams();

  const [edit, setEdit] = useState(false);

  const { control, setValue, watch, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      startDate: start_date,
      endDate: end_date,
      title,
      startTime: start_time,
      endTime: end_time,
      price,
      description,
      cover_image,
    },
  });

  console.log(cover_image);

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
      console.log(uri);
    }
  };

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
            <Pressable
              style={styles.changeImageButton}
              onPress={() => {
                console.log("Change image pressed");
              }}
            >
              <GreenCamera />
              <Text style={styles.changeImageText}>Change image</Text>
            </Pressable>
          )}
          <Image style={styles.image} source={{ uri: cover_image }} />
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
            <Button label="Save" />
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
    </View>
  );
};

export default EditBootcamp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
