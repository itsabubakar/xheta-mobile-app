import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { EditIcon, RoundBack } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  title: string;
  bg?: boolean;
  editIcon?: boolean;
};

const ScreenHeader = ({ title, bg, editIcon }: Props) => {
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
      {editIcon ? (
        <View>
          <EditIcon />
        </View>
      ) : (
        <View style={{ width: 40 }} />
      )}
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
