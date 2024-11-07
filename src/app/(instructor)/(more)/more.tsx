import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import {
  Accomplisment,
  Bootcamp,
  Chevron,
  Community,
  Logout,
  Preferences,
  Profile,
  Security,
  SlimChevronIcon,
  Support,
} from "~/assets/icons";
import {
  CirlcedPaymentAndBilling,
  CirlcedPaymentHistory,
} from "~/assets/icons/moreIcons";
import { useAuthStore } from "~/src/core/storage";
import { Text, theme } from "~/theme";

type Props = object;

const More = (props: Props) => {
  const router = useRouter();
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  const handleLogout = async () => {
    await clearAuthData();
    router.replace("/"); // Adjust the route as necessary
  };

  return (
    <View style={styles.container}>
      <Text
        variant="lg"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.white,
          padding: 16,
        }}
      >
        More
      </Text>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.itemConc}>
          <View style={styles.linksContainer}>
            <MoreLink icon={<Community />} title="Community" />
            <MoreLink
              icon={<CirlcedPaymentHistory />}
              title="Payment history"
            />
            <MoreLink icon={<Profile />} title="Profile" />
            <MoreLink icon={<Security />} title="Security" />
            <MoreLink
              icon={<CirlcedPaymentAndBilling />}
              title="Payment & Billing"
            />
            <MoreLink icon={<Preferences />} title="Preferences" />
          </View>
        </ScrollView>
        <Pressable onPress={handleLogout} style={styles.logoutContainer}>
          <Logout />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MoreLink = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const href =
    `/(instructor)/(more)/${title.toLowerCase()}` as Href<`/(instructor)/(more)/${string}`>;

  return (
    <Pressable onPress={() => router.push(href)} style={styles.moreLink}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <View style={styles.chevronContainer}>
        <SlimChevronIcon />
      </View>
    </Pressable>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemConc: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  linksContainer: {
    rowGap: 16,
  },
  moreLink: {
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    borderRadius: 16,
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  chevronContainer: {
    marginLeft: "auto",
  },
  logoutContainer: {
    padding: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 24,
  },
  logoutText: {
    color: "#F97066",
  },
});
