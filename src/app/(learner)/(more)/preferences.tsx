import React, { useState } from "react";
import { View } from "react-native";

import { CustomSwitch, ScreenHeader } from "~/src/ui";
import { Text } from "~/theme";

const Preferences = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScreenHeader bg title="Preferences" />
      <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
        <Preference text="Desktop notifications" />
        <Preference text="Email notifications" />
        <Preference text="SMS notifications" />
        <Preference text="In-App notifications" />
      </View>
    </View>
  );
};

const Preference = ({ text }: { text: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "#1D1D1D", fontSize: 16 }}>{text}</Text>
      <CustomSwitch
        value={isChecked}
        onValueChange={() => setIsChecked(!isChecked)}
      />
    </View>
  );
};

export default Preferences;
