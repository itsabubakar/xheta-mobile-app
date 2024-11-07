import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { payment } from "~/assets/images";
import { Button, ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const Wallet = (props: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallet" />

      <View
        style={{
          padding: 16,
        }}
      >
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
          </View>
        </View>

        <View
          style={{
            marginTop: 32,
          }}
        >
          <Button onPress={() => router.push("/withdraw")} label="Withdraw" />
        </View>
        <View style={styles.imageContainer}>
          <Image source={payment} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1.1,
  },
});
