import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View, Alert, ScrollView } from "react-native";

import { FileIcon } from "~/assets/icons";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledDropdown, ControlledTextArea } from "~/src/ui/form/input";
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

const AddAssignments = (props: Props) => {
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
              name="name"
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
              name="name"
              control={control}
              label="Assignment title"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
          <ControlledTextArea
            control={control}
            name="name"
            label="Description"
            placeholder="Enter a short description..."
          />

          <View>
            <Text>Assignment material </Text>
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
          </View>
        </View>

        <View
          style={{
            marginTop: 16,
          }}
        >
          <Button label="Add assignment" />
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
