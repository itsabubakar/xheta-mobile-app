import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  gray: "#434343",
  darkGray: "#38434D",
  white: "#FFFFFF",
  black: "#1D1D1D",
  purple: "#6366F1",
  primary: "#03363D",
  lightPrimary: "#CDD7D8",
  tertiary: "#E7F2F3",
  focus: "#57797E",
  error: "#FDA29B",
  lightGray: "#F7F7F9",
  borderColor: "#D2D2D266",
  lightBlack: "#686868",
  green: "#027A48",
  lightGreen: "#ECFDF3",
};

const theme = createTheme({
  colors: {
    ...palette,
    gray: palette.gray,
  },
  spacing: {
    xs_4: 4,
    s_8: 8,
    sm_12: 12,
    m_16: 16,
    ml_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    s_3: 3,
    m_6: 6,
    l_12: 12,
    xl_24: 24,
  },
  textVariants: {
    defaults: {
      fontFamily: "AeonikNormal",
      fontSize: 14,
      color: "gray",
      minHeight: 20,
    },
    body: {
      fontSize: 16,
      fontFamily: "AeonikNormal",
    },
    title: { fontSize: 24, fontFamily: "AeonikBold", color: "black" },
    subtitle: {
      fontSize: 16,
      fontFamily: "AeonikMedium",
    },
    normal_bold: {
      fontFamily: "AeonikBold",
      fontSize: 16,
      color: "black",
    },
    large: {
      fontSize: 36,
    },
    extra_large: {
      fontSize: 64,
      fontWeight: "bold",
    },
    sm: {
      fontSize: 12,
    },
    md: {
      fontSize: 14,
      fontFamily: "AeonikMedium",
    },
    lg: {
      fontSize: 18,
      fontFamily: "AeonikBold",
      color: "black",
    },
    italic: {
      fontFamily: "AeonikNormalItalic",
      fontSize: 16,
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T,
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
