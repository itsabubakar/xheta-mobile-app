import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { FileIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Button, ScreenHeader } from "~/src/ui";
import {
  ControlledDropdown,
  ControlledInput,
  ControlledTextArea,
} from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

type Props = object;
type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  time_zone: string;
};

const EditCourse = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      time_zone: "America/New_York",
    },
  });
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
      <ScreenHeader editIcon bg title="Edit Course" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <Text style={{ marginBottom: 16 }}>Preview</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={course} />
        </View>

        <View style={{ marginTop: 16 }}>
          <ControlledInput
            name="name"
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
            name="name"
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
              name="name"
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
              name="name"
              control={control}
              label="Course price"
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
              name="name"
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
              name="name"
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
          <Text>Course thumbnail</Text>
          <Pressable
            onPress={pickImage}
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
            <FileIcon />
            <Text style={{ textAlign: "center" }}>
              Click to upload an image
            </Text>
          </Pressable>
          <View style={{ marginVertical: 16 }}>
            <ControlledTextArea
              placeholder="Enter description"
              name="name"
              control={control}
              label="Course description"
            />
          </View>
        </View>
        <View>
          <Text>Course intro video</Text>
          <Pressable
            onPress={pickImage}
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
            <FileIcon />
            <Text style={{ textAlign: "center" }}>
              Click to upload an image
            </Text>
          </Pressable>

          <View style={{ paddingTop: 24 }}>
            <Button label="Save" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
});
