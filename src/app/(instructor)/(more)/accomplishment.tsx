import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import { DownloadIcon } from "~/assets/icons";
import { certificate, noAccomplishments } from "~/assets/images";
import { fetchAccomplishments } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

// Define the shape of an accomplishment
interface Accomplishment {
  id: string; // Assuming each accomplishment has a unique ID
  title: string;
  date: string;
  grade: string;
}

const Accomplisment: React.FC = () => {
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = useAuthStore((state) => state.authData?.access_token);

  useEffect(() => {
    const getAccomplishments = async () => {
      if (!accessToken) return; // If no token, do nothing
      try {
        const fetchedAccomplishments = await fetchAccomplishments(accessToken);
        setAccomplishments(fetchedAccomplishments.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching accomplishments:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getAccomplishments();
  }, [accessToken]);

  if (loading) {
    return (
      <>
        <ScreenHeader bg title="Accomplishment" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Accomplishment" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="subtitle">Completed courses</Text>
        {accomplishments.length > 0 ? (
          <View style={styles.accomplishmentList}>
            {accomplishments.map((accomplishment) => (
              <AccomplishmentCard key={accomplishment.id} {...accomplishment} />
            ))}
          </View>
        ) : (
          <View style={styles.noAccomplishmentsContainer}>
            <View>
              <Image source={noAccomplishments} />
            </View>
            <Text variant="md" style={{ color: theme.colors.black }}>
              You do no have any accomplishment yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

interface AccomplishmentCardProps {
  title: string;
  date: string;
  grade: string;
}

const AccomplishmentCard: React.FC<AccomplishmentCardProps> = ({
  title,
  date,
  grade,
}) => {
  return (
    <View style={styles.card}>
      <View>
        <Text variant="md">{title}</Text>
        <Text style={styles.cardText}>Completed {date}</Text>
        <Text style={styles.cardText}>Grade: {grade}</Text>
      </View>
      <View>
        <Image style={styles.certificateImage} source={certificate} />
        <View style={styles.downloadSection}>
          <DownloadIcon />
          <Text style={{ fontFamily: "AeonikMedium", color: "#102A2D" }}>
            Download
          </Text>
        </View>
      </View>
    </View>
  );
};

// Styles using StyleSheet for better performance
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  accomplishmentList: {
    rowGap: 16,
    marginTop: 8,
  },
  noAccomplishmentsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  card: {
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontFamily: "AeonikMedium",
    fontSize: 12,
  },
  certificateImage: {
    width: 60,
    height: 48,
    alignSelf: "flex-end",
  },
  downloadSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});

export default Accomplisment;
