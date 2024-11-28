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
} from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, FileIcon } from "~/assets/icons";
import { info } from "~/assets/images";
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

const AddBootCamp = (props: Props) => {
  const router = useRouter();
  const [showModuleCreationModal, setCourseModuleModal] = useState(false);
  const [showBootCampCreated, setShowBootCampCreated] = useState(false);

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
      <ScreenHeader bg title="Add bootcamp" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View style={{ marginTop: 16 }}>
          <ControlledInput
            name="name"
            control={control}
            label="Title"
            rules={{
              required: "Name is required",
            }}
            placeholder="Nil"
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
              label="Start date"
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
              label="End date"
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
              label="Start time"
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
              label="End time"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View>
        </View>

        <View style={{ marginVertical: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <ControlledTextArea
              placeholder="Enter description"
              name="name"
              control={control}
              label="Course description"
            />
          </View>
          <Text>Cover image</Text>
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
        <Button onPress={() => setShowBootCampCreated(true)} label="Create" />
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
              onPress={() => {
                setCourseModuleModal(false);
                // setShowCourseCreated(true);
              }}
              variant="lightPrimary"
              label="Save for later"
              width="48%"
            />
            <Button
              onPress={() => router.push("/add-modules")}
              width="48%"
              label="Add modules"
              fontFamily="AeonikMedium"
            />
          </View>
        </View>
      </Modal>
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
            <Pressable onPress={() => setShowBootCampCreated(false)}>
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
            onPress={() => router.back()}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
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
});
