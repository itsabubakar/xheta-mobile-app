import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { PlusIcon } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  title: string;
  bg?: boolean;
  buttonLabel: string;
  buttonRoute: Href<string>;
};

const ScreenHeaderWithButton = ({
  title,
  bg,
  buttonLabel,
  buttonRoute,
}: Props) => {
  const router = useRouter(); // Initialize the navigate function

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg ? theme.colors.primary : "" },
      ]}
    >
      <Text variant="lg" style={[styles.title, { color: bg ? "white" : "" }]}>
        {title}
      </Text>

      <Pressable
        style={{
          backgroundColor: theme.colors.tertiary,
          padding: 8,
          borderRadius: 8,
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.push(buttonRoute)}
      >
        <PlusIcon />
        <Text
          style={{
            color: theme.colors.primary,
            fontFamily: "AeonikBold",
          }}
        >
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
};

export default ScreenHeaderWithButton;

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
  },
});
