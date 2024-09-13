import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
} from "react-native";

import { useTheme } from "~/theme";

interface ButtonProps extends Omit<PressableProps, "disabled"> {
  label?: string;
  loading?: boolean;
  icon?: React.ReactNode; // New prop for icon
  iconPosition?: "left" | "right"; // Positioning for the icon
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
  textColor?: string; // New prop for text color override
  fontFamily?: string; // New prop for font family
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      label,
      loading = false,
      icon, // Icon component
      iconPosition = "left", // Icon position default to left
      variant = "default",
      size = "default",
      disabled = false,
      fullWidth = false,
      textColor, // Custom text color
      fontFamily = "AeonikBold", // Default font family
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const getBackgroundColor = () => {
      if (disabled) return theme.colors.black;
      switch (variant) {
        case "secondary":
          return theme.colors.gray || "#6B7280";
        case "outline":
          return "transparent";
        case "destructive":
          return theme.colors.white || "#DC2626";
        case "ghost":
        case "link":
          return "transparent";
        default:
          return theme.colors.primary;
      }
    };

    const getTextColor = () => {
      if (textColor) return textColor; // Use hardcoded color if provided
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
      if (variant === "outline") return theme.colors.black || "#D1D5DB";
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
            fontSize: theme.textVariants.sm.fontSize,
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
            flexDirection: "row", // Allows icon and text to sit next to each other
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
          <>
            {icon && iconPosition === "left" && (
              <View style={{ marginRight: label ? 8 : 0 }}>{icon}</View>
            )}
            {label && (
              <Text
                style={{
                  color: getTextColor(),
                  fontSize: getSizeStyles().fontSize,
                  fontFamily, // Use the custom or default font family
                  height: 20,
                }}
              >
                {label}
              </Text>
            )}
            {icon && iconPosition === "right" && (
              <View style={{ marginLeft: label ? 8 : 0 }}>{icon}</View>
            )}
          </>
        )}
      </Pressable>
    );
  },
);
