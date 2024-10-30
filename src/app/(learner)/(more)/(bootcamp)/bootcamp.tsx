import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";

import { BootcampSection } from "~/components";
import { fetchBootcamps } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { theme } from "~/theme";

const Bootcamp = () => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;

  const [bootcamps, setBootcamps] = useState([]); // Store bootcamps
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!accessToken) return;

    const fetchBootCampsFromAPI = async () => {
      try {
        const response = await fetchBootcamps(accessToken);
        setBootcamps(response.data); // Save bootcamps to state
      } catch (error) {
        console.error("Error fetching bootcamps:", error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchBootCampsFromAPI();
  }, [accessToken]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Bootcamps" />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}
      >
        {loading ? (
          <View
            style={{
              marginTop: 200,
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : bootcamps.length > 0 ? (
          <BootcampSection bootcamps={bootcamps} />
        ) : (
          <Text>No bootcamps available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Bootcamp;
