import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { profile } from "~/assets/images";
import { Text } from "~/theme";

type Props = object;

const Lesson = (props: Props) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push("/1");
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderColor: "#D2D2D266",
          borderWidth: 1,
          padding: 16,
          columnGap: 16,
          borderRadius: 12,
          // Shadow for iOS
          shadowColor: "#101828",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          // Elevation for Android
          elevation: 1,
          backgroundColor: "#fff",
          marginBottom: 16,
        }}
      >
        <Image style={{ width: 48, height: 48 }} source={profile} />
        <View
          style={{
            flex: 1,
            rowGap: 6,
          }}
        >
          <Text color="gray">10:am - 12:00pm</Text>
          <Text variant="md"> Joseph Parker</Text>
          <Text color="gray">
            I’m having difficulties with carrying out competitive audit.{" "}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Lesson;

const styles = StyleSheet.create({});
