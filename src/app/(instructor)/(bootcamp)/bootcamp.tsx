import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { course, noContent } from "~/assets/images";
import { CreatedCourses } from "~/components";
import { getTutorBootCamps } from "~/src/api/tutor-bootcamps";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithButton } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const BootCamp = (props: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "draft">(
    "all",
  );
  const [loading, setLoading] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [bootCamps, setBootCamps] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const params = useLocalSearchParams();
  const router = useRouter();
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching new data for:", activeTab);
      const res = await getTutorBootCamps(accessToken); // Add timestamp
      console.log("Fetched data:", res.data?.length);
      if (res.data?.length > 0) {
        setBootCamps(res.data);
      } else {
        setBootCamps([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load drafts from SecureStore
  const loadDrafts = async () => {
    try {
      console.log("Loading drafts...");
      const draftsData = await SecureStore.getItemAsync("bootcamp_drafts");
      if (draftsData) {
        setDrafts(JSON.parse(draftsData));
      } else {
        setDrafts([]);
      }
    } catch (error) {
      console.error("Failed to load drafts:", error);
    }
  };

  useEffect(() => {
    fetchData();
    loadDrafts();
  }, []);

  useEffect(() => {
    // Refetch only if refetch param is true
    if (params.refetch === "true") {
      console.log(params);
      console.log("refetching the data");
      fetchData();
      loadDrafts();

      router.setParams({ refetch: undefined }); // Clear the param after refetching
    }
  }, [params.refetch]);

  const renderData = () => {
    switch (activeTab) {
      case "all":
        // Combine API and draft data
        return [...bootCamps, ...drafts];
      case "pending":
        // Show only API data
        return bootCamps.filter((item: any) => !item.isDraft); // Exclude drafts
      case "draft":
        // Show only drafts
        return drafts.filter((item: any) => item.isDraft);
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeaderWithButton
        buttonRoute="/add-bootcamp"
        buttonLabel="Create"
        bg
        title="Bootcamps"
      />
      <View style={styles.tabRow}>
        <TabButton
          label="All"
          isActive={activeTab === "all"}
          onPress={() => setActiveTab("all")}
          badgeCount={bootCamps.length + drafts.length}
        />
        <TabButton
          label="Pending"
          isActive={activeTab === "pending"}
          onPress={() => setActiveTab("pending")}
          badgeCount={bootCamps.length}
        />
        <TabButton
          badgeCount={drafts.length}
          label="Draft"
          isActive={activeTab === "draft"}
          onPress={() => setActiveTab("draft")}
        />
      </View>

      {/* Content */}
      {renderData().length === 0 ? (
        <View style={styles.noContentContainer}>
          <Image style={{ marginBottom: 16 }} source={noContent} />
          <Text>You have no content available in this tab.</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.campListContainer}
        >
          {renderData().map((info: any) => (
            <Camp
              info={info}
              key={info.id || info.title}
              isDraft={info.isDraft || false}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BootCamp;

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
  badgeCount?: number | string;
};

const TabButton = ({
  label,
  isActive,
  onPress,
  badgeCount,
}: TabButtonProps) => (
  <Pressable
    onPress={onPress}
    style={[styles.tabButton, isActive && styles.activeTab]}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
    {/* Show Badge if there's a count */}
    {badgeCount ? (
      <View
        style={[
          styles.badge,
          isActive ? styles.activeBadge : styles.inactiveBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isActive ? styles.activeBadgeText : styles.inactiveBadgeText,
          ]}
        >
          {badgeCount}
        </Text>
      </View>
    ) : null}
  </Pressable>
);

const Camp = ({ info, isDraft }: { info: any; isDraft?: boolean }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/bootcamp-details",
          params: {
            id: info.id || null,
            isDraft: isDraft ? "true" : "false",
            draftData: isDraft ? JSON.stringify(info) : undefined,
          },
        })
      }
      style={styles.campContainer}
    >
      <View>
        {isDraft ? (
          // Use a local image for drafts
          <Image
            style={{ width: "100%", height: 106, borderRadius: 8 }}
            source={info?.coverImage}
          />
        ) : (
          // Use a URI for non-drafts
          <Image
            style={{ width: "100%", height: 106, borderRadius: 8 }}
            source={{ uri: info.cover_image }}
          />
        )}
      </View>
      <Text
        style={{
          paddingTop: 8,
          paddingBottom: 4,
          color: "#1D1D1D",
        }}
        variant="md"
      >
        {info.title}
      </Text>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          color: theme.colors.lightBlack,
        }}
      >
        {info.description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Text style={styles.price}>
          #{info.price}{" "}
          {isDraft && <Text style={{ color: "red" }}> (Draft)</Text>}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  campContainer: {
    borderWidth: 1,
    flexBasis: "47%",
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
    maxWidth: 163.5,
    marginBottom: 24,
  },
  price: {
    fontFamily: "AeonikBold",
    fontSize: 14,
    color: "#1D1D1D",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 24,
  },
  tabButton: {
    position: "relative",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 104,
    backgroundColor: "#EDEDED",
    borderBottomWidth: 2,
    borderBottomColor: "#DCDCDC", // Default border color for tabs
  },
  activeTab: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    fontSize: 16,
    color: "#686868",
  },
  activeTabText: {
    color: theme.colors.primary,
    fontFamily: "AeonikMedium",
  },
  badge: {
    marginLeft: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  inactiveBadge: {
    backgroundColor: "#FFFFFF",
  },
  activeBadge: {
    backgroundColor: theme.colors.tertiary,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  inactiveBadgeText: {
    color: "#B4B4B4",
  },
  activeBadgeText: {
    color: theme.colors.primary,
  },
  // Additional Styles
  noContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 16,
  },
  campListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
