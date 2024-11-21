import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import LottieView from "lottie-react-native";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { greenTick } from "~/assets/animations";
import { CircleX } from "~/assets/icons";
import { info, profile } from "~/assets/images";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const DynamicLessonScreen = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // State for managing steps
  const { control } = useForm({});

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
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
    <View style={styles.container}>
      <ScreenHeader bg title="Lesson request" />
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          columnGap: 16,
        }}
      >
        <Image style={{ width: 48, height: 48 }} source={profile} />
        <View
          style={{
            flex: 1,
            rowGap: 6,
          }}
        >
          <Text color="gray">10:am - 12:00pm</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur. Diam congue in at accumsan
          urna neque at. Maecenas vestibulum ut dictum risus etiam. Aliquam
          sollicitudin a sed orci scelerisque velit rhoncus et. Et tincidunt
          semper auctor quisque maecenas vitae feugiat sit. Amet sed eros
          pretium id. Nec fermentum vivamus sed blandit habitant vitae ut. Id ut
          eget convallis vitae vel tincidunt. Quisque viverra aliquam nulla
          egestas ante sit lectus. Ultricies ornare faucibus enim pellentesque
          aliquet. Et in nec massa pulvinar lacus justo tempus in. Vestibulum
          vestibulum posuere sagittis non ut lacus velit vel. Tempor volutpat
          aliquet amet tellus sapien cursus orci fringilla.
        </Text>
      </View>
      <View
        style={{
          marginTop: "auto",
          marginBottom: 20,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="lightPrimary" width="49%" label="Decline" />
        <Button onPress={openBottomSheet} width="49%" label="Accept" />
      </View>
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
          {step === 1 ? (
            <View style={styles.bottomSheetConc}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 24,
                }}
              >
                <View>
                  <Image
                    style={{
                      alignSelf: "center",
                    }}
                    source={info}
                  />
                </View>
                <Text variant="subtitle" style={{ textAlign: "center" }}>
                  Accept lesson schedule
                </Text>
                <Text style={{ textAlign: "center", paddingTop: 4 }}>
                  You are about to approve this lesson request
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16 }}
              >
                <Button
                  variant="lightPrimary"
                  onPress={() => setStep(2)}
                  label="Cancel"
                  width="48%"
                />
                <Button
                  onPress={() => setStep(2)}
                  width="48%"
                  label="Approve"
                  fontFamily="AeonikMedium"
                />
              </View>
            </View>
          ) : step === 2 ? (
            <View style={styles.bottomSheetConc}>
              <Text variant="subtitle">Email verification</Text>
            </View>
          ) : step === 3 ? (
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

                <Button label="Proceed" onPress={() => setStep(3)} />
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
                  source={greenTick}
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
              <Button onPress={() => setStep(1)} label="Proceed" />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default DynamicLessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
