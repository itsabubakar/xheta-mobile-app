import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Notifications } from "~/assets/icons";
import { profile } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const HeaderWithUsername = (props: Props) => {
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
      <Image style={{ width: 48, height: 48 }} source={profile} />
      <View style={{ marginLeft: 8 }}>
        <Text
          style={{ color: "white", fontFamily: "AeonikBold", fontSize: 14 }}
        >
          Welcome Joseph Parker
        </Text>
        <Text
          style={{ color: "white", fontFamily: "AeonikNormal", fontSize: 12 }}
        >
          Take up your learning journey from here
        </Text>
      </View>
      <Pressable
        style={styles.notificationButton}
        onPress={() => router.push("/notifications")}
      >
        <Notifications />
      </Pressable>
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
