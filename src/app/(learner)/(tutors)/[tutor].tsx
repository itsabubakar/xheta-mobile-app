import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";

import { TutorsBottomSheet, TutorsInfo } from "~/components";
import { fetchOneTutor } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Tutor = () => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;
  const { tutor }: { tutor: string } = useLocalSearchParams(); // Pulling the 'id' from the dynamic route
  const [tutorInfo, setTutorInfo] = useState() as any; // Store tutors
  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    if (!accessToken) return;
    if (!tutor) return;

    const fetchOneTutorInfoFromAPI = async () => {
      console.log("fetching", tutor);
      try {
        const response = await fetchOneTutor(accessToken, tutor);
        setTutorInfo(response.data); // Save tutors to state
        console.log(response.data, "single tutor info");
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchOneTutorInfoFromAPI();
  }, [accessToken]);

  console.log(tutor, "id value");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <ScreenHeader bg title="Tutor's details" />
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 24,
              backgroundColor: "white",
            }}
          >
            <TutorsInfo info={tutorInfo} />
          </ScrollView>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopStartRadius: 32,
              borderTopEndRadius: 32,
              backgroundColor: "white",
              // Shadow for iOS
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2, // Slightly increase opacity for a more visible effect
              shadowRadius: 8, // Reduce the radius for a more defined shadow
              // Shadow for Android
              elevation: 10, // Adjust the elevation to mimic the shadow's spread
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  color: theme.colors.black,
                }}
              >
                Price
              </Text>
              <Text variant="title">
                #{tutorInfo?.TutorHourlyCharge}
                <Text
                  style={{
                    fontFamily: "AeonikNormal",
                    fontSize: 20,
                  }}
                >
                  /hr
                </Text>
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Button onPress={openBottomSheet} label="Book tutor" />
            </View>
          </View>
          <TutorsBottomSheet
            tutorId={tutorInfo?.id}
            bottomSheetRef={bottomSheetRef}
          />
        </>
      )}
    </View>
  );
};

export default Tutor;
