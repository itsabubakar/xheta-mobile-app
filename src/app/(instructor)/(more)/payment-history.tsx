import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { GreenIconDown, RedIconUp } from "~/assets/icons";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const PaymentHistory = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Payment History" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
      </ScrollView>
    </View>
  );
};

const Payment = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingVertical: 14,
        borderColor: theme.colors.borderColor,
        flex: 1,
      }}
    >
      <View style={{ rowGap: 14 }}>
        <Text style={{ color: "#434343" }}>10/05/2024</Text>
        <Text>George Brown</Text>
      </View>
      <View style={{ rowGap: 14 }}>
        <Text
          style={{
            backgroundColor: theme.colors.lightGreen,
            color: theme.colors.green,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          Success
        </Text>
        <Text style={{ gap: 8 }} variant="subtitle">
          $ 100 {"  "}
          <RedIconUp />
        </Text>
      </View>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
