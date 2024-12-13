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
import { Text, theme } from "~/theme";

type Props = object;

type FormData = {
  course_name: string;
  category_id: string;
  course_price: string;
  course_level: string;
  course_description: string;
  course_image: string;
  course_intro_video: string;
  course_duration: string;
  prerequisite: string;
  course_goals: string;
  certificate: string
};

const AddCourses = (props: Props) => {
  const router = useRouter();
  const [showModuleCreationModal, setCourseModuleModal] = useState(false);
  const [showCourseCreated, setShowCourseCreated] = useState(false);
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
      category_id:"", certificate: "", course_description: "", course_duration: "", course_goals :"",  course_image: "", course_intro_video: "", course_level: "", course_name:"",  course_price: "", prerequisite: ""
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
      setImage(uri)
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (!image) return;


    try {
      const response = await client.post("tutor/course/create", data);

      const res = response.data;

      console.log(res);

      setLoading(false); // Stop loading once the request is complete
 setCourseModuleModal(true)
    } catch (err: any) {
      console.error(err.response.data.message);
      showToast(err.response.data.message || "An unexpected error occurred");
      setLoading(false); // Stop loading if the request fails
    }
  };
  
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Add Courses" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <View>
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
        </View>

        <View style={{ marginTop: 16 }}>
          <ControlledInput
            name="course_name"
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
            name="category_id"
            control={control}
            label="Course category"
            rules={{
              required: "category is required",
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
          {/* <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              name="course_price"
              control={control}
              label="Course price"
              rules={{
                required: "Name is required",
              }}
              placeholder="Nil"
            />
          </View> */}
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              name="course_price"
              control={control}
              label="Course price"
              rules={{
                required: "Course price is required",
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
              name="certificate"
              control={control}
              label="Certificate"
              rules={{
                required: "certificate is required",
              }}
              placeholder="Nil"
            />
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <ControlledInput
              name="course_level"
              control={control}
              label="Level"
              rules={{
                required: "Level is required",
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
              name="course_description"
              control={control}
              label="Course description"
            />
          </View>
        </View>
        <Button onPress={() => setCourseModuleModal(true)} label="Preview" />
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
                setShowCourseCreated(true);
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
      <Modal isVisible={showCourseCreated}>
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
            <Pressable onPress={() => setShowCourseCreated(false)}>
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
            Your course has been created successfully
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

export default AddCourses;

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
