import { Link, useRouter } from "expo-router";
import React, { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { EditIcon, RoundBack } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  title: string;
  bg?: boolean;
  buttonFunction?: () => void;
  icon?: ReactElement;
};

const ScreenHeaderWithCustomIcon = ({
  title,
  bg,
  buttonFunction,
  icon,
}: Props) => {
  const router = useRouter(); // Initialize the navigate function

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg ? theme.colors.primary : "" },
      ]}
    >
      <Pressable onPress={() => router.back()}>
        <RoundBack />
      </Pressable>
      <Text variant="lg" style={[styles.title, { color: bg ? "white" : "" }]}>
        {title}
      </Text>
      <Pressable onPress={buttonFunction}>{icon}</Pressable>
    </View>
  );
};

export default ScreenHeaderWithCustomIcon;

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
