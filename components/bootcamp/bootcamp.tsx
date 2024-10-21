import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { CalenderIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const Bootcamp = (props: Props) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate("/(bootcamp)/1")}
      style={styles.container}
    >
      <View>
        <Image
          style={{
            width: "100%",
            height: 106,
            borderRadius: 8,
          }}
          source={course}
        />
        <View
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            backgroundColor: theme.colors.lightGray,
            paddingHorizontal: 4,
            borderRadius: 8,
            paddingTop: 2,
            flexDirection: "row",
            columnGap: 8,
          }}
        >
          <CalenderIcon />
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: 12,
            }}
          >
            26 - 27 April
          </Text>
        </View>
      </View>
      <Text
        style={{
          paddingTop: 8,
          paddingBottom: 4,
          color: "#1D1D1D",
        }}
        variant="md"
      >
        UI/UX Design
      </Text>
      <Text
        style={{
          color: theme.colors.lightBlack,
        }}
      >
        Master the art of creating intuitive user interfaces (UI)...
      </Text>
      <View
        style={{
          paddingTop: 4,
        }}
      >
        <Text style={styles.price}>#5000</Text>
      </View>
    </Pressable>
  );
};

export default Bootcamp;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexBasis: "47%",
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderColor: theme.colors.borderColor,
    maxWidth: 163.5,
  },
  price: {
    fontFamily: "AeonikBold",
    fontSize: 14,
    color: "#1D1D1D",
  },
});
