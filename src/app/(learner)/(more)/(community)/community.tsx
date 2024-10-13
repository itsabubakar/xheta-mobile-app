import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Persons } from "~/assets/icons";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Communities = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Community" />

      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
        <Community />
      </ScrollView>
    </View>
  );
};

const Community = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(community)/1")}
      style={styles.community}
    >
      <View
        style={{
          backgroundColor: theme.colors.borderColor,
          borderRadius: 9999,
          padding: 8,
        }}
      >
        <Persons />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#1D1D1D",
            marginBottom: 8,
          }}
          variant="md"
        >
          General
        </Text>
        <Text variant="sm" numberOfLines={2} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ullam vero
          eveniet eaque ipsa, est, excepturi enim amet repellendus non possimus
          eius quod commodi esse inventore cumque aliquam quia saepe.
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  community: {
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
});

export default Communities;
