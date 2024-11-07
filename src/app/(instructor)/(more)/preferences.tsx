import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import { fetchPreference } from "~/src/api";
import { updatePreference } from "~/src/api/profile";
import { useAuthStore } from "~/src/core/storage"; // For access token
import { CustomSwitch, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Preferences = () => {
  const accessToken = useAuthStore((state) => state.authData?.access_token);
  const [preferences, setPreferences] = useState({
    desktop_notifications: false,
    email_notifications: false,
    sms_notifications: false,
    in_app_notifications: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPreferences = async () => {
      if (!accessToken) return; // If no token, do nothing
      try {
        const fetchedPreferences = await fetchPreference(accessToken); // Fetch preferences
        setPreferences(fetchedPreferences.data); // Set initial state
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getPreferences();
  }, [accessToken]);

  const handleToggle = async (key: string, value: boolean) => {
    try {
      console.log(key, value);

      const updatedPref = await updatePreference(
        "578|2Gh29TnCz1ZE7RhHH2gQe3DuKp54uSjFZnx9N5Ak62c3bddb",
        key,
        value,
      ); // Update on API
      setPreferences((prev) => ({ ...prev, [key]: value })); // Update local state
      console.log(updatedPref);
    } catch (error) {
      console.error("Failed to update preference:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Preferences" />
      <View style={styles.preferencesContainer}>
        <Preference
          text="Desktop notifications"
          value={preferences.desktop_notifications}
          onToggle={(value) => handleToggle("desktop_notifications", value)}
        />
        <Preference
          text="Email notifications"
          value={preferences.email_notifications}
          onToggle={(value) => handleToggle("email_notifications", value)}
        />
        <Preference
          text="SMS notifications"
          value={preferences.sms_notifications}
          onToggle={(value) => handleToggle("sms_notifications", value)}
        />
        <Preference
          text="In-App notifications"
          value={preferences.in_app_notifications}
          onToggle={(value) => handleToggle("in_app_notifications", value)}
        />
      </View>
    </View>
  );
};

const Preference = ({
  text,
  value,
  onToggle,
}: {
  text: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}) => {
  return (
    <View style={styles.preferenceItem}>
      <Text style={styles.preferenceText}>{text}</Text>
      <CustomSwitch value={value} onValueChange={onToggle} />
    </View>
  );
};

export default Preferences;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  preferencesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  preferenceText: {
    color: "#1D1D1D",
    fontSize: 16,
  },
};
