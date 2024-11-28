import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";
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
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX } from "~/assets/icons";
import { profile } from "~/assets/images";
import {
  fetchProfilePicture,
  updateProfile,
  updateProfilePicture,
} from "~/src/api";
import { useAuthStore, AuthData } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { ControlledInput } from "~/src/ui/form";
import { ControlledDropdown } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  education: string;
  interest: string[];
};

const Profile = () => {
  const authState = useAuthStore((state) => state.authData);
  const [disabled, setDisabled] = useState(true);
  // const {
  //   name ,
  //   email,
  //   id,
  //   gender,
  //   profile_image,
  //   level_of_education,
  //   access_token,
  // } = authState as AuthData;

  const name = "Sadiq B";
  const email = "ssad@gmail.com";
  const gender = "male";
  const level_of_education = "high";
  const access_token = "1234";

  // const updateAuthState = useAuthStore((state) => state.setAuthData);
  const [profileImage, setProfileImage] = useState(authState?.profile_image);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const getNames = (fullName: string) => {
    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");
    return { firstName, lastName };
  };

  const { firstName, lastName } = getNames(name);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      gender: gender || "",
      education: level_of_education || "",
      interest: ["ui/ux design", "female"],
    },
  });

  const onSubmit = async (formData: FormData) => {
    const { firstName, lastName, email, gender, education, interest } =
      formData;

    // Get the current auth state from the store
    const currentAuthData = useAuthStore.getState().authData;

    if (!currentAuthData || !access_token) return;

    // Create an object with only the changed fields
    const updatedData: Partial<AuthData> = {};

    // Always update the name field
    updatedData.name = `${firstName || currentAuthData.name.split(" ")[0]} ${lastName || currentAuthData.name.split(" ").slice(1).join(" ")}`;

    // Always update the email field
    updatedData.email = email || currentAuthData.email;

    // Always update the gender field
    updatedData.gender = gender || currentAuthData.gender;

    // Always update the level of education field
    updatedData.level_of_education =
      education || currentAuthData.level_of_education;

    // Always update the area of interest
    updatedData.area_of_interest = 1;

    console.log(updatedData);

    try {
      setLoading(true);

      // Call the API with the updated data
      const response = await updateProfile(access_token, updatedData);

      console.log(response);

      // Update the local auth store with new data
      await updateAuthState({
        ...currentAuthData,
        ...updatedData,
      });

      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
      setDisabled(!disabled);
    }
  };

  const handleEdit = () => {
    setDisabled(!disabled);
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
      setProfileImage(uri);
      await uploadProfilePicture(uri, mimeType);
    }
  };

  const updateAuthState = async (newAuthData: Partial<AuthData>) => {
    try {
      // Get the current auth state from the store
      const currentAuthData = useAuthStore.getState().authData;

      // Merge the current auth data with the new data
      const updatedAuthData = {
        ...currentAuthData,
        ...newAuthData,
      } as AuthData;

      // Save the updated data to SecureStore (as a JSON string)
      await SecureStore.setItemAsync(
        "authData",
        JSON.stringify(updatedAuthData),
      );

      // Update Zustand state
      useAuthStore.setState({
        authData: updatedAuthData,
        isAuthenticated: true,
      });

      console.log("Auth state updated successfully:", updatedAuthData);
    } catch (error) {
      console.error("Error updating auth state:", error);
    }
  };

  const uploadProfilePicture = async (imageUri: string, mimeType: any) => {
    const formData = new FormData();

    // @ts-expect-error: special react native format for form data
    formData.append("profile_image", {
      uri: imageUri,
      type: mimeType,
      name: "profile.jpg",
    });

    if (!access_token) return; // If no token, do nothing

    setLoading(true); // Start loading

    try {
      // Upload the profile picture
      const newProfilePicture = await updateProfilePicture(
        access_token,
        formData,
      );
      console.log(newProfilePicture, "response from server");

      // Fetch the updated profile image URL
      const updatedProfile = await fetchProfilePicture(access_token);

      console.log(updatedProfile.profile_image);

      if (updatedProfile?.profile_image) {
        await updateAuthState({
          profile_image: updatedProfile.profile_image, // Update only the profile image
        });

        setProfileImage(updatedProfile.profile_image); // Update local state if necessary
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Error",
        "Failed to update profile picture. Please try again.",
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader
        editButtonFunction={handleEdit}
        editIcon={disabled}
        bg
        title=" Profile"
        showEditText
      />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <View>
          <Text
            style={{
              paddingBottom: 16,
            }}
            variant="subtitle"
          >
            {!disabled ? "Edit" : ""} Personal details
          </Text>
          <Pressable
            onPress={!disabled ? pickImage : undefined}
            style={{
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderRadius: 16,
              marginBottom: 16,
              overflow: "hidden", // Clips the image within the rounded border
            }}
          >
            <Image
              source={
                authState?.profile_image ? { uri: profileImage } : profile
              }
              style={{
                position: "absolute", // Fills the parent view
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                resizeMode: "cover", // Ensures proportional scaling without distortion
              }}
            />
          </Pressable>
          <View style={styles.formView}>
            {/* First name Field */}
            <ControlledInput
              disabled={disabled}
              name="firstName"
              control={control}
              shadow
              label="First Name"
              rules={{
                required: "First name is required",
                pattern: {
                  message: "Please enter a first name",
                },
              }}
              placeholder="John"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View style={styles.formView}>
            {/* Last name Field */}
            <ControlledInput
              disabled={disabled}
              name="lastName"
              control={control}
              shadow
              label="Last name"
              rules={{
                required: "Last name is required",
                pattern: {
                  message: "Please enter a valid name",
                },
              }}
              placeholder="Parker"
            />
            {errors.lastName && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.lastName.message}
              </Text>
            )}
          </View>
          <View style={styles.formView}>
            {/* Email Field */}
            <ControlledInput
              disabled={disabled}
              name="email"
              control={control}
              shadow
              label="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              }}
              placeholder="jo.parker@gmail.com"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
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
              <ControlledDropdown
                disabled={disabled}
                name="education"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Gender"
                options={[
                  { label: "Bachelors", value: "bachelors" },
                  { label: "Beginner", value: "Beginner" },
                  { label: "Prefer not to say", value: "prefer not to say" },
                ]}
              />
            </View>
            <View style={{ width: "100%", flex: 1 }}>
              <ControlledDropdown
                disabled={disabled}
                name="education"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Certification"
                options={[
                  { label: "Bachelors", value: "bachelors" },
                  { label: "Beginner", value: "Beginner" },
                  { label: "Prefer not to say", value: "prefer not to say" },
                ]}
              />
            </View>
          </View>

          <View />
          <View>
            <ControlledDropdown
              disabled={disabled}
              name="interest"
              control={control}
              multiSelect
              rules={{ required: "Please select a type" }}
              label="Expertise"
              options={[
                { label: "UI/UX Design", value: "ui/ux design" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer not to say" },
              ]}
            />
          </View>

          {!disabled && (
            <View style={{ marginTop: 24 }}>
              <Button
                loading={loading}
                label="Save Changes"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* Modal for success message */}
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            marginTop: "25%",
            backgroundColor: theme.colors.white,
            padding: 16,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={() => setModalVisible(false)}>
              <CircleX />
            </Pressable>
          </View>
          <View style={{ alignSelf: "center" }}>
            <LottieView
              style={styles.lottie}
              source={greenTick}
              autoPlay
              loop={false}
            />
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingVertical: 16 }}
          >
            Your personal details were updated successfully!
          </Text>

          <Button
            label="Dismiss"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  formView: {
    marginBottom: 16,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
