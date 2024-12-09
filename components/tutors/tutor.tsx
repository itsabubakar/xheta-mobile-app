import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { StarIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { Text, theme } from "~/theme";

type Props = object;

const Tutor = ({ tutor }: any) => {
  const router = useRouter();
  console.log(tutor.id);

  const { id } = tutor;

  return (
    <Pressable
      onPress={() => router.navigate(`/(tutors)/${id}`)}
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
        By {tutor.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <Text style={styles.price}>#{tutor.TutorHourlyCharge} / hr</Text>
        <Text style={styles.price}>
          <View>
            <StarIcon size={20} />
          </View>
          5.0
        </Text>
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
    marginBottom: 16,
  },
  price: {
    fontFamily: "AeonikBold",
    fontSize: 14,
    color: "#1D1D1D",
    flexDirection: "row",
    alignItems: "center",
  },
});
