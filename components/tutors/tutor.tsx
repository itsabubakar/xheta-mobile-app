import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const Tutor = (props: Props) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate("/(tutors)/1")}
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
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <Text style={styles.price}>#5000</Text>
        <Text style={styles.price}>5.0</Text>
      </View>
    </Pressable>
  );
};

export default Tutor;

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
