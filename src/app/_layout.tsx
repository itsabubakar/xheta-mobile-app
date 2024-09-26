import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "theme";

import { useAuthStore } from "~/src/core/storage";

export const unstable_settings = {
  initialRouteName: "(learner)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    // ... your fonts
  });

  const hydrateAuthData = useAuthStore((state) => state.hydrateAuthData);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Hydrate auth data from SecureStore
        await hydrateAuthData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); // Mark app as ready after hydration
      }
    };

    prepareApp();
  }, [hydrateAuthData]);

  useEffect(() => {
    if (loaded && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, appIsReady]);

  if (!loaded || !appIsReady) {
    return null; // Wait until everything is ready
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="signin" />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {children}
        </SafeAreaView>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
