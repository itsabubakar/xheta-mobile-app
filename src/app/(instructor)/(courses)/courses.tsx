import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { noContent } from "~/assets/images";
import { CreatedCourses } from "~/components";
import { getTutorCourses } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithButton } from "~/src/ui";
import { theme } from "~/theme";

type Props = object;

const Courses = (props: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "draft">(
    "all",
  );
  const [loading, setLoading] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";

  console.log("Access token:", accessToken);
  const [courses, setCourses] = useState([]);
  const params = useLocalSearchParams();
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching new data for:", activeTab);
      const res = await getTutorCourses(accessToken);
      console.log("Fetched data:", res.data?.length);
      if (res.data?.length > 0) {
        setCourses(res.data);
      } else {
        setCourses([]);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    // Refetch only if refetch param is true
    if (params.refetch === "true") {
      console.log(params);
      console.log("refetching the data");
      fetchData();

      router.setParams({ refetch: undefined }); // Clear the param after refetching
    }
  }, [params.refetch]);

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
        buttonRoute="/add-courses"
        buttonLabel="Add Course"
        bg
        title="My courses"
      />

      <View style={styles.tabRow}>
        <TabButton
          label="All"
          isActive={activeTab === "all"}
          onPress={() => setActiveTab("all")}
          badgeCount={0}
        />
        <TabButton
          label="Pending"
          isActive={activeTab === "pending"}
          onPress={() => setActiveTab("pending")}
          badgeCount={0}
        />
        <TabButton
          label="Draft"
          isActive={activeTab === "draft"}
          onPress={() => setActiveTab("draft")}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
          flexWrap: "wrap",
        }}
      >
        {courses.map((course: any) => (
          <CreatedCourses key={course.id} course={course} />
        ))}
        {courses.length === 0 && (
          <View style={styles.noContentContainer}>
            <Image style={{ marginTop: 160 }} source={noContent} />
            <Text>You have no content available in this tab.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Courses;

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
  badgeCount?: number;
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

const styles = StyleSheet.create({
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

    // Box Shadow for iOS
    shadowColor: "#101828",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Equivalent to #1018280F
    shadowRadius: 4,

    // Box Shadow for Android
    elevation: 4, // Adjust the elevation to mimic the shadow's spread
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
  noContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 16,
  },
});
