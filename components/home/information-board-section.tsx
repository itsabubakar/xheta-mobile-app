import React from "react";
import { StyleSheet, View } from "react-native";

import Information from "./information";

import { SectionHeader } from "~/src/ui";

type Props = object;

const InformationBoardSection = (props: Props) => {
  return (
    <View>
      <SectionHeader
        title="Information board"
        subheading="Upcoming activities"
        link="/"
      />
      <Information />
      <Information />
    </View>
  );
};

export default InformationBoardSection;

const styles = StyleSheet.create({});
