import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "theme";

import { useAuthStore } from "~/src/core/storage";

export const unstable_settings = {
  initialRouteName: "/",
};

interface SafeAreaViewProps {
  children: React.ReactNode;
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  style?: ViewStyle;
}

const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  edges = { top: true, bottom: true, left: true, right: true },
  style,
}) => {
  const insets = useSafeAreaInsets();

  const paddingStyle: ViewStyle = {
    paddingTop: edges.top ? insets.top : 0,
    paddingBottom: edges.bottom ? insets.bottom : 0,
    paddingLeft: edges.left ? insets.left : 0,
    paddingRight: edges.right ? insets.right : 0,
  };

  return <View style={[paddingStyle, style]}>{children}</View>;
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
        <Stack.Screen name="notifications" />
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
