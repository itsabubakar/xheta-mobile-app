import React from "react";
import { View } from "react-native";

import { SearchInput } from "./form/input";

import { Text, theme } from "~/theme";

type Props = {
  title: string;
  onSearch: (query: string) => void;
};

const ScreenHeaderWithSearchBar = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
      }}
    >
      <Text
        variant="lg"
        style={{
          color: theme.colors.white,
        }}
      >
        {props.title}
      </Text>
      <View
        style={{
          paddingTop: 16,
        }}
      >
        <SearchInput
          placeholder="Search for course name..."
          onSearch={props.onSearch}
        />
      </View>
    </View>
  );
};

export default ScreenHeaderWithSearchBar;
