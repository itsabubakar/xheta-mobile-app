import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { StarIcon } from "~/assets/icons";
import { Text, theme } from "~/theme";

type Props = object;

const Hero = (props: Props) => {
  return (
    <View>
      <Withdraw />
      <View style={{ paddingTop: 24, flexDirection: "row", gap: 16 }}>
        <Cube text="Hourly charges" number={500} />
        <Cube text="Created courses" number={5} />
      </View>
      <View style={{ paddingTop: 16, flexDirection: "row", gap: 16 }}>
        <Cube text="Personalized learners" number={5} />
        <Cube text="Completed classes" number={5} />
      </View>
      <View style={{ paddingTop: 16, flexDirection: "row", gap: 16 }}>
        <Cube text="Cancelled classes" number={5} />
        <Cube icon={<StarIcon />} text="Platform rating" number={5} />
      </View>
    </View>
  );
};

export default Hero;

const Cube = ({
  text,
  number,
  icon,
}: {
  text: string;
  number: number;
  icon?: React.ReactNode;
}) => {
  return (
    <View
      style={{
        borderColor: "#D2D2D266",
        borderWidth: 1,
        padding: 16,
        borderRadius: 16,
        flex: 1,
        flexDirection: "row",
        gap: 8,
      }}
    >
      {icon}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>{text}</Text>
        <Text>{number}</Text>
      </View>
    </View>
  );
};

const Withdraw = () => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >
        Available balance
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "AeonikBold",
          }}
        >
          #50,000
        </Text>
        <Pressable
          style={{
            backgroundColor: "#CDD7D8",
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "AeonikBold",
            }}
          >
            Withdraw
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
