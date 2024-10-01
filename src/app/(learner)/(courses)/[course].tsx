import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { PlayIcon, StarIcon } from "~/assets/icons";
import { course } from "~/assets/images";
import { CourseDetailHeader, CourseInfo } from "~/components";
import { Button, ScreenHeader } from "~/src/ui";
import { Text } from "~/theme";

type Props = object;

const CourseDetails = (props: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader bg title="Course details" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
        }}
      >
        <CourseDetailHeader />
        <CourseInfo />
      </ScrollView>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          borderWidth: 1,
          // Box Shadow for iOS
          shadowColor: "white",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1, // Equivalent to #1018280F
          shadowRadius: 4,

          // Box Shadow for Android
          elevation: 4, // Adjust the elevation to mimic the shadow's spread
        }}
      >
        <View style={{ width: "50%" }}>
          <Text>Price</Text>
          <Text variant="title">#5,000</Text>
        </View>
        <View style={{ width: "50%" }}>
          <Button label="Enroll" />
        </View>
      </View>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
