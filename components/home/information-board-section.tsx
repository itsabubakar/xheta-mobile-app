import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Information from "./information";

import { NoContentIcon } from "~/assets/icons";
import { imgThree, noContent } from "~/assets/images";
import { SectionHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const InformationBoardSection = ({ upcomingClasses }: any) => {
  const router = useRouter();

  return (
    <View>
      <SectionHeader
        title="Information board"
        subheading="Upcoming activities"
        link="/"
      />
      {Array.isArray(upcomingClasses) && upcomingClasses.length > 0 ? (
        upcomingClasses.map((item: any) => <Information key={item.id} />)
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={{ width: 200, height: 200 }} source={imgThree} />
          <Text
            style={{
              paddingTop: 16,
              textAlign: "center",
            }}
          >
            Scheduled classes will appear here when available
          </Text>
        </View>
      )}
    </View>
  );
};

export default InformationBoardSection;

const styles = StyleSheet.create({});
