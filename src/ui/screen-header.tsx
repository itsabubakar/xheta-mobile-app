import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { RoundBack } from "~/assets/icons";
import { Text } from "~/theme";

type Props = {
  title: string;
};

const ScreenHeader = ({ title }: Props) => {
  const router = useRouter(); // Initialize the navigate function

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <RoundBack />
      </Pressable>
      <Text variant="lg" style={styles.title}>
        {title}
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1, // Allows the title to take remaining space
    textAlign: "center",
  },
});
