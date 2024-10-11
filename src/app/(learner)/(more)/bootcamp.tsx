import React from "react";
import { View, ScrollView } from "react-native";

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
      <ScreenHeader bg title="Accomplishment" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      >
        <Text variant="subtitle">Completed courses</Text>
        <View style={{ rowGap: 16, marginTop: 8 }} />
      </ScrollView>
    </View>
  );
};

export default Bootcamp;
