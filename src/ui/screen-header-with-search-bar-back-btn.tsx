import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import { SearchInput } from "./form/input";

import { RoundBack } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  title: string;
  onSearch: (query: string) => void;
  placeholder?: string;
};

const ScreenHeaderWithSearchBarAndBack = (props: Props) => {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <RoundBack />
      </Pressable>
      <View
        style={{
          paddingTop: 16,
          flex: 1,
        }}
      >
        <SearchInput
          placeholder={props.placeholder || "Search for course name..."}
          onSearch={props.onSearch}
        />
      </View>
    </View>
  );
};

export default ScreenHeaderWithSearchBarAndBack;
