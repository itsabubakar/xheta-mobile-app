import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { CalenderGreen } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = {
  id: number;
  title: string;
};

const Bootcamp = ({ bootcamp }: any) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(`/(bootcamp)/${bootcamp?.id}`)}
      style={styles.container}
    >
      <View>
        <Image
          style={{
            width: "100%",
            height: 106,
            borderRadius: 8,
          }}
          source={bootcamp.cover_image ? { uri: bootcamp.cover_image } : course}
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
          <CalenderGreen />
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: 12,
            }}
          >
            {bootcamp?.start_and_end_date}
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
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {bootcamp?.title}
      </Text>
      <Text
        style={{
          color: theme.colors.lightBlack,
        }}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {bootcamp?.description}
      </Text>
      <View
        style={{
          paddingTop: 4,
        }}
      >
        <Text style={styles.price}>#{bootcamp?.price}</Text>
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
