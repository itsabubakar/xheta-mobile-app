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
import { useAuthStore } from "~/src/core/storage";
import { Text, theme } from "~/theme";

type Props = object;

const More = (props: Props) => {
  const router = useRouter();
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  const handleLogout = async () => {
    await clearAuthData();
    // Optionally navigate to login or home screen after logout
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
      <ScrollView contentContainerStyle={styles.itemConc}>
        <View
          style={{
            rowGap: 16,
          }}
        >
          <MoreLink icon={<Bootcamp />} title="Bootcamp" />
          {/* <MoreLink icon={<Community />} title="Community" /> */}
          <MoreLink icon={<Profile />} title="Profile" />
          <MoreLink icon={<Security />} title="Security" />
          <MoreLink icon={<Accomplisment />} title="Accomplishment" />
          <MoreLink icon={<Preferences />} title="Preferences" />
          <MoreLink icon={<Support />} title="Support" />
        </View>
        <Pressable
          onPress={handleLogout}
          style={{
            marginTop: 26,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8,
          }}
        >
          <Logout />
          <Text
            style={{
              color: "#F97066",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </ScrollView>
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
    `/(learner)/(more)/${title.toLowerCase()}` as Href<`/(learner)/(more)/${string}`>;

  return (
    <Pressable
      onPress={() => router.push(href)}
      style={{
        borderColor: theme.colors.borderColor,
        borderWidth: 1,
        padding: 12,
        flexDirection: "row",
        borderRadius: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginRight: 10,
        }}
      >
        {icon}
      </View>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <View
        style={{
          marginLeft: "auto",
        }}
      >
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
  itemConc: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
});
