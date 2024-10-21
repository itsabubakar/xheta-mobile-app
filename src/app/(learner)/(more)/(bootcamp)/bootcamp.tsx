import React from "react";
import { View, ScrollView } from "react-native";

import { BootcampSection } from "~/components";
import { ScreenHeader } from "~/src/ui";
import { Text } from "~/theme";

const Bootcamp = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader bg title="Bootcamps" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <BootcampSection />
      </ScrollView>
    </View>
  );
};

export default Bootcamp;
