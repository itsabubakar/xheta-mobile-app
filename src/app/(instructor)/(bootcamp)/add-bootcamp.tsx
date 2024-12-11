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
import { client } from "~/src/api/client";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledDropdown, ControlledTextArea } from "~/src/ui/form/input";
import Toast from "~/src/ui/toast/custom-toast";
import { Text, theme } from "~/theme";
import { convertBase64 } from "~/utils/helper";

type Props = object;

type FormData = {
  title: string;
  description: string;
  price: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  cover_image: string;
  number_of_participants: string;
};

const AddBootCamp = (props: Props) => {
  const router = useRouter();
  const [showModuleCreationModal, setCourseModuleModal] = useState(false);
  const [showBootCampCreated, setShowBootCampCreated] = useState(false);
  const [image, setImage] = useState<string>();
  // Manage loading state
  const [loading, setLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      cover_image: "",
      description: "",
      end_date: "",
      end_time: "",
      number_of_participants: "",
      price: "",
      start_date: "",
      start_time: "",
      title: "",
    },
  });
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to grant camera roll permission to upload a picture."
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (!image) return;
    const coverImage = await convertBase64(image);

    data = { ...data, cover_image: coverImage };

    try {
      const response = await client.post("tutor/bootcamps/create", data);

      const res = response.data;

      console.log(res);

      setLoading(false); // Stop loading once the request is complete
      setShowBootCampCreated(true);
    } catch (err: any) {
      console.error(err.response.data.message);
      showToast(err.response.data.message || "An unexpected error occurred");
      setLoading(false); // Stop loading if the request fails
    }
  };
  return (
    <View style={styles.container}>
      {toastVisible && (
        <Toast
          type="error"
          message={toastMessage}
          onDismiss={() => setToastVisible(false)}
        />
      )}
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
              name="start_date"
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
              name="end_date"
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
              name="start_time"
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
              name="end_time"
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
              name="description"
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
        <Button
          onPress={() => handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          label="Create"
        />
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
