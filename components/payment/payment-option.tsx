import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Chevron, PayStackIcon } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = {
  icon: React.ReactElement;
  option: string;
  text: string;
  onPress: () => void;
};

const PaymentOption = (props: Props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        borderColor: theme.colors.lightGray,
        padding: 16,
        marginTop: 16,
        flexDirection: "row",
        columnGap: 16,
      }}
    >
      {/* Image */}
      <View>{props.icon}</View>
      {/* text */}
      <View>
        <Text variant="subtitle">Pay with {props.option}</Text>
        <Text
          style={{
            maxWidth: 231,
            paddingRight: 2,
          }}
        >
          {props.text}
        </Text>
      </View>
      {/* Icon */}
      <View style={{ transform: [{ rotate: "270deg" }], marginLeft: "auto" }}>
        <Chevron size={24} />
      </View>
    </Pressable>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({});
