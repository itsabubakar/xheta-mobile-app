import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { getNotifications } from "~/src/api";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Notifications = (props: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [notifications, setNotifications] = useState([]);

  const accessToken = useAuthStore((state) => state.authData?.access_token);

  useEffect(() => {
    if (!accessToken) return;
    const fetchNotifications = async () => {
      try {
        const notifications = await getNotifications(accessToken);
        console.log(notifications.data);
        setNotifications(notifications.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchNotifications();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications" />
      <View style={styles.tabRow}>
        <TabButton
          label="All"
          isActive={activeTab === "all"}
          onPress={() => setActiveTab("all")}
          badgeCount={0}
        />
        <TabButton
          label="Unread"
          isActive={activeTab === "unread"}
          onPress={() => setActiveTab("unread")}
          badgeCount={0}
        />
        <TabButton
          label="Read"
          isActive={activeTab === "read"}
          onPress={() => setActiveTab("read")}
        />
      </View>

      {notifications?.length !== 0 ? (
        <ScrollView contentContainerStyle={styles.content}>
          {activeTab === "all" && (
            <View>
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
            </View>
          )}
          {activeTab === "unread" && (
            <View>
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
            </View>
          )}
          {activeTab === "read" && (
            <View>
              <Notification />
              <Notification />
              <Notification />
              <Notification />
              <Notification />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.noNotificationContainer}>
          <Text>Notifications will appear here</Text>
        </View>
      )}
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
    </View>
  );
};

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

const Notification = () => {
  return (
    <View style={styles.notification}>
      <Text style={styles.date}>05:30pm / 05-05-24</Text>
      <Text style={styles.notificationText}>
        Shanon Wills just accepted your request for a tutoring session
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 0,
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
  content: {
    padding: 16,
  },
  notification: {
    backgroundColor: "#F5F5F5",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  date: {
    color: "#686868",
    marginBottom: 4,
  },
  notificationText: {
    color: "#1D1D1D",
  },
  noNotificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notifications;
