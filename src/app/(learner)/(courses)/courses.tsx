import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { CategoriesSection } from "~/components";
import { HeaderWithSearchBar } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Courses = (props: Props) => {
  return (
    <View style={styles.container}>
      <HeaderWithSearchBar
        title="Courses"
        onSearch={(query) => console.log(query)}
      />
      <CategoriesSection />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
