import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import LottieView from "lottie-react-native";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

import EmailVerification from "./email-verification";

import { CircleX } from "~/assets/icons";
import { xhetaBanner } from "~/assets/images";
import { Button } from "~/src/ui";
import { ControlledDropdown } from "~/src/ui/form/input";
import { Text } from "~/theme";

const { width: screenWidth } = Dimensions.get("window");

// Calculate the image width maintaining the aspect ratio
const imageWidth = screenWidth * 0.9; // 90% of screen width
const imageHeight = (imageWidth * 156) / 343; // Maintain aspect ratio

const HomeBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [step, setStep] = useState<
    "welcome" | "email-verification" | "profile-update" | "update-succesfull"
  >("welcome"); // State for managing steps
  const { control } = useForm({});

  // bottomSheetRef.current?.expand();
  // bottomSheetRef.current?.expand();
  // bottomSheetRef.current?.expand();
  // bottomSheetRef.current?.expand();
  // bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();
  bottomSheetRef.current?.expand();

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
                onPress={() => setStep("email-verification")}
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
              <Text variant="subtitle">Email verification</Text>
              <View style={styles.dropDownView} />
              <ControlledDropdown
                name="gender"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Gender"
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
                label="Level of education"
                options={[
                  { label: "Nil", value: "nil" },
                  { label: "Hign school", value: "hign school" },
                  { label: "Diploma", value: "diploma" },
                  { label: "Bachelors", value: "bachelors" },
                  { label: "Masters", value: "masters" },
                  { label: "PhD", value: "phd" },
                ]}
              />
              <ControlledDropdown
                multiSelect
                name="interests"
                control={control}
                rules={{ required: "Please select a type" }}
                label="Area of interest"
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

              <Button
                label="Proceed"
                onPress={() => setStep("update-succesfull")}
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
              Your email verification is successful
            </Text>
            <Button label="Proceed" />
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
