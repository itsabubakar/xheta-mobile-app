import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Notifications } from "~/assets/icons";
import { profile } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = {
  name: string | undefined;
  profileImage: string | undefined;
};

const HeaderWithUsername = ({ name, profileImage }: Props) => {
  const router = useRouter();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          router.push("/(instructor)/(more)/profile");
        }}
      >
        <Image
          style={{ width: 48, height: 48, borderRadius: 9999 }}
          source={profileImage ? { uri: profileImage } : profile}
        />
      </Pressable>
      <View style={{ marginLeft: 8 }}>
        <Text
          style={{ color: "white", fontFamily: "AeonikBold", fontSize: 14 }}
        >
          Welcome {name}
        </Text>
        <Text
          style={{ color: "white", fontFamily: "AeonikNormal", fontSize: 12 }}
        >
          Take up your learning journey from here
        </Text>
      </View>
      <Pressable
        style={styles.notificationButton}
        onPress={() => {
          console.log("Navigating to /notifications");
          router.push("/notifications");
        }}
      >
        <Notifications />
      </Pressable>

      <StatusBar />
    </View>
  );
};

export default HeaderWithUsername;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  notificationButton: {
    marginLeft: "auto",
    marginTop: 4,
  },
});
