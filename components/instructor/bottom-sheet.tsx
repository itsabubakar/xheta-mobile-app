import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import * as DocumentPicker from "expo-document-picker";
import LottieView from "lottie-react-native";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import EmailVerification from "./email-verification";

import { CircleX, FileIcon } from "~/assets/icons";
import { xhetaBanner } from "~/assets/images";
import { updateProfile } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { Button } from "~/src/ui";
import { ControlledDropdown } from "~/src/ui/form/input";
import { Text, theme } from "~/theme";

const { width: screenWidth } = Dimensions.get("window");

// Calculate the image width maintaining the aspect ratio
const imageWidth = screenWidth * 0.9; // 90% of screen width
const imageHeight = (imageWidth * 156) / 343; // Maintain aspect ratio

type FormData = {
  gender: string;
  education: string;
  interest: string[];
  qualification: string;
  note: any;
};

const HomeBottomSheet = ({
  accountActivated,
  bottomSheetRef,
}: {
  accountActivated: boolean | undefined;
  bottomSheetRef: React.RefObject<BottomSheet>;
}) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [step, setStep] = useState<
    "welcome" | "email-verification" | "profile-update" | "update-successful"
  >("welcome"); // State for managing steps
  const [loading, setLoading] = useState(false);
  const [assignmentDocument, setAssignmentDocument] = useState<any>({});

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch, // allows us to "watch" the value of a field
  } = useForm<FormData>({
    defaultValues: {
      gender: "",
      education: "",
      interest: ["ui/ux design", "female"],
      qualification: "",
      note: null,
    },
  });

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} opacity={0.7} />,
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    // handle index changes
  }, []);

  const renderHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.bottomSheetIndicator} />
    </View>
  );

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

        console.log("Picked document:", file);
      } else {
        console.error("No document was selected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
      console.error("Error picking document:", error);
    }
  };

  const handleProfileUpdate = async (data: FormData) => {
    console.log(data, "profile update function");

    setLoading(true);
    try {
      const res = await updateProfile(accessToken, {
        name: authData?.name,
        gender: data.gender,
        level_of_education: data.education,
        area_of_interest: 1,
        email: authData?.email,
      });
      setLoading(false);
      setStep("update-successful");
    } catch (error: any) {
      setLoading(false);

      console.error(error.response.data);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // Open the sheet at the 50% snap point when rendered
      snapPoints={[1, "30%"]} // Change snap points based on step
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      enableDynamicSizing
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        {step === "welcome" ? (
          <View style={styles.bottomSheetConc}>
            <Image
              source={xhetaBanner}
              style={{
                width: imageWidth,
                height: imageHeight,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 24,
              }}
            >
              <Text variant="subtitle" style={{ textAlign: "center" }}>
                Welcome to your dashboard
              </Text>
              <Text style={{ textAlign: "center", paddingTop: 4 }}>
                We’re glad to have you onboard. Kindly follow this process to
                complete your profile set up.
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16 }}
            >
              <Button
                onPress={closeBottomSheet}
                variant="outline"
                label="Skip"
                width="48%"
              />
              <Button
                onPress={() => setStep("email-verification")}
                width="48%"
                label="Proceed"
                fontFamily="AeonikMedium"
              />
            </View>
          </View>
        ) : step === "email-verification" ? (
          <View style={styles.bottomSheetConc}>
            <EmailVerification onSetBottomSheet={setStep} />
          </View>
        ) : step === "profile-update" ? (
          <View style={styles.bottomSheetConc}>
            <Pressable
              onPress={closeBottomSheet}
              style={{
                alignItems: "flex-end",
                paddingRight: 16,
              }}
            >
              <CircleX />
            </Pressable>
            <View
              style={{
                paddingHorizontal: 16,
              }}
            >
              <Text variant="subtitle">Profile update</Text>
              <View style={styles.dropDownView} />
              <ControlledDropdown
                name="gender"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Area of expertise"
                options={[
                  { label: "Nil", value: "nil" },
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Prefer not to say", value: "prefer not to say" },
                ]}
              />
              <ControlledDropdown
                name="education"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Do you have a qualification"
                options={[
                  { label: "Nil", value: "nil" },
                  { label: "High school", value: "high school" },
                  { label: "Diploma", value: "diploma" },
                  { label: "Bachelors", value: "bachelors" },
                  { label: "Masters", value: "masters" },
                  { label: "PhD", value: "phd" },
                ]}
              />

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: "AeonikMedium" }}>
                  Upload your qualification
                </Text>
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

              <Button
                loading={loading}
                disabled={loading}
                label="Proceed"
                onPress={handleSubmit(handleProfileUpdate)}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
          >
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <LottieView
                style={styles.lottie}
                source={require("../../assets/animations/green-tick.json")}
                autoPlay
                loop
              />
            </View>
            <Text
              variant="subtitle"
              style={{ textAlign: "center", paddingBottom: 24 }}
            >
              Your profile update is successful
            </Text>
            <Button onPress={closeBottomSheet} label="Proceed" />
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default HomeBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomSheetIndicator: {
    width: 70,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 3,
  },
  bottomSheetConc: {
    paddingBottom: 16,
  },
  dropDownView: {
    paddingTop: 16,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
