import { useRouter } from "expo-router";
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
import { getTutorBootCamps } from "~/src/api/tutor-courses";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("fetching", activeTab);
        const res = await getTutorBootCamps(accessToken);
        if (res.data) {
          console.log(res.data);
          setLoading(false);
          setBootCamps(res.data);
        } else {
          console.log(res.message);
          setLoading(false);
          setBootCamps([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
          badgeCount="0"
        />
        <TabButton
          label="Pending"
          isActive={activeTab === "pending"}
          onPress={() => setActiveTab("pending")}
          badgeCount="0"
        />
        <TabButton
          badgeCount="0"
          label="Draft"
          isActive={activeTab === "draft"}
          onPress={() => setActiveTab("draft")}
        />
      </View>

      {bootCamps.length < 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                marginBottom: 16,
              }}
              source={noContent}
            />
            <Text>You have not created any bootcamp yet.</Text>
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              flexWrap: "wrap",
            }}
          >
            {bootCamps.map((info: any) => (
              <Camp info={info} key={info.id} />
            ))}
          </ScrollView>
        </>
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

const Camp = (props: any) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/bootcamp-details")}
      style={styles.campContainer}
    >
      <View>
        <Image
          style={{
            width: "100%",
            height: 106,
            borderRadius: 8,
          }}
          source={{ uri: props.info.cover_image }}
        />
      </View>
      <Text
        style={{
          paddingTop: 8,
          paddingBottom: 4,
          color: "#1D1D1D",
        }}
        variant="md"
      >
        {props.info.title}
      </Text>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          color: theme.colors.lightBlack,
        }}
      >
        {props.info.description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Text style={styles.price}>#{props.info.price}</Text>
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
});
