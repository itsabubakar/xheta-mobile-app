import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "theme";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    AeonikThin: require("../../assets/fonts/Aeonik-Air.otf"),
    AeonikThinItalic: require("../../assets/fonts/Aeonik-AirItalic.otf"),
    AeonikHeavy: require("../../assets/fonts/Aeonik-Black.otf"),
    AeonikHeavyItalic: require("../../assets/fonts/Aeonik-Black.otf"),
    AeonikBold: require("../../assets/fonts/Aeonik-Bold.otf"),
    AeonikBoldItalic: require("../../assets/fonts/Aeonik-BoldItalic.otf"),
    AeonikLight: require("../../assets/fonts/Aeonik-Thin.otf"),
    AeonikLightItalic: require("../../assets/fonts/Aeonik-ThinItalic.otf"),
    AeonikMedium: require("../../assets/fonts/Aeonik-Medium.otf"),
    AeonikMediumItalic: require("../../assets/fonts/Aeonik-MediumItalic.otf"),
    AeonikNormal: require("../../assets/fonts/Aeonik-Regular.otf"),
    AeonikNormalItalic: require("../../assets/fonts/Aeonik-RegularItalic.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {children}
        </SafeAreaView>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
