import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { Button } from "~/src/ui";

const PaymentWebView = () => {
  const { url } = useLocalSearchParams(); // Retrieve the URL passed in params
  const router = useRouter();

  if (!url) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        <Button
          onPress={() => router.back()}
          variant="lightPrimary"
          label="Go Back"
        />
      </View>
      <WebView
        source={{ uri: url as string }}
        style={styles.webview}
        startInLoadingState
      />
    </View>
  );
};

export default PaymentWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
