import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = object;

const PaymentBilling = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>PaymentBilling</Text>
    </View>
  );
};

export default PaymentBilling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
