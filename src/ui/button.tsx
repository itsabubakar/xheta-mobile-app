// import { useTheme } from "@shopify/restyle";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
  type View,
} from "react-native";

import { useTheme } from "~/theme";

interface ButtonProps extends Omit<PressableProps, "disabled"> {
  label?: string;
  loading?: boolean;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "lg" | "sm" | "icon";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      label,
      loading = false,
      variant = "default",
      size = "default",
      disabled = false,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const getBackgroundColor = () => {
      if (disabled) return theme.colors.black;
      switch (variant) {
        case "secondary":
          return theme.colors.gray || "#6B7280"; // Fallback color if not in theme
        case "outline":
          return "transparent";
        case "destructive":
          return theme.colors.white || "#DC2626"; // Fallback to red
        case "ghost":
        case "link":
          return "transparent";
        default:
          return theme.colors.primary;
      }
    };

    const getTextColor = () => {
      if (disabled) return theme.colors.black;
      switch (variant) {
        case "outline":
          return theme.colors.black;
        case "ghost":
        case "link":
          return theme.colors.black;
        default:
          return theme.colors.white;
      }
    };

    const getBorderColor = () => {
      if (variant === "outline") return theme.colors.black || "#D1D5DB"; // Fallback neutral
      return "transparent";
    };

    const getSizeStyles = () => {
      switch (size) {
        case "lg":
          return {
            paddingVertical: theme.spacing.m_16,
            paddingHorizontal: theme.spacing.l_32,
            fontSize: theme.textVariants.large.fontSize,
          };
        case "sm":
          return {
            paddingVertical: theme.spacing.s_8,
            paddingHorizontal: theme.spacing.m_16,
            fontSize: theme.textVariants.body.fontSize,
          };
        case "icon":
          return { height: 36, width: 36 };
        default:
          return {
            paddingVertical: theme.spacing.m_16,
            paddingHorizontal: theme.spacing.m_16,
            fontSize: theme.textVariants.body.fontSize,
          };
      }
    };

    return (
      <Pressable
        disabled={disabled || loading}
        style={[
          {
            backgroundColor: getBackgroundColor(),
            borderRadius: theme.borderRadii.l_12,
            borderWidth: variant === "outline" ? 1 : 0,
            borderColor: getBorderColor(),
            alignItems: "center",
            justifyContent: "center",
            width: fullWidth ? "100%" : "auto",
          },
          getSizeStyles(),
        ]}
        {...props}
        ref={ref}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text
            style={{
              color: getTextColor(),
              fontSize: getSizeStyles().fontSize,
              fontFamily: "AeonikBold",
            }}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  },
);
