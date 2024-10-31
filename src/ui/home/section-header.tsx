import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "../button";

import { Text } from "~/theme";

type Props = {
  title: string;
  link: string;
  subheading?: string;
  showSeeMore?: boolean;
};

const SectionHeader = ({ title, link, subheading, showSeeMore }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text variant="subtitle">{title}</Text>
        {subheading && (
          <Text style={{ paddingTop: 4, height: 24 }}>{subheading}</Text>
        )}
      </View>
      <Button
        style={{ borderWidth: 0 }}
        variant="link"
        size="sm"
        label={showSeeMore ? "See more" : ""}
        fontFamily="AeonikNormal"
      />
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
