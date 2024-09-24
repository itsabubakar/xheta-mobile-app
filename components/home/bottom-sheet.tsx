import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { xhetaBanner } from "~/assets/images";
import { CircleX } from "~/assets/icons";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/src/ui";
import { Text } from "~/theme";
import EmailVerification from "./email-verification";

type Props = {};

const { width: screenWidth } = Dimensions.get("window");

// Calculate the image width maintaining the aspect ratio
const imageWidth = screenWidth * 0.9; // 90% of screen width
const imageHeight = (imageWidth * 156) / 343; // Maintain aspect ratio

const HomeBottomSheet = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [step, setStep] = useState<"welcome" | "otp">("welcome"); // State for managing steps

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  useEffect(() => {
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.expand();
  }, [Math.random()]);

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
      index={0}
      snapPoints={[1, "50%"]}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
    >
      <BottomSheetView style={styles.contentContainer}>
        {step === "welcome" ? (
          <>
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
                onPress={() => setStep("otp")} // Change to OTP step
                variant="outline"
                label="Skip"
                width={"48%"}
              />
              <Button width={"48%"} label="Proceed" fontFamily="AeonikMedium" />
            </View>
          </>
        ) : (
          <View>
            <Pressable
              onPress={closeBottomSheet}
              style={{
                alignItems: "flex-end",
                paddingRight: 16,
              }}
            >
              <CircleX />
            </Pressable>
            <EmailVerification />
          </View>
        )}
      </BottomSheetView>
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
});
