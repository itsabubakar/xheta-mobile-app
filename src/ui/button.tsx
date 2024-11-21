import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  Text,
  View,
  type PressableProps,
} from "react-native";

import { useTheme } from "~/theme";

interface ButtonProps extends Omit<PressableProps, "disabled"> {
  label?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "lightPrimary"
    | "ghost"
    | "link";
  size?: "default" | "lg" | "sm" | "icon" | "md";
  disabled?: boolean;
  width?: DimensionValue;
  textColor?: string;
  fontFamily?: string;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      label,
      loading = false,
      icon,
      iconPosition = "left",
      variant = "default",
      size = "default",
      disabled = false,
      width,
      textColor,
      fontFamily = "AeonikBold",
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    // Keep the background transparent for 'link' even when disabled
    const getBackgroundColor = () => {
      if (variant === "link") return "transparent"; // No background for link
      if (disabled) return theme.colors.tertiary;
      switch (variant) {
        case "secondary":
          return theme.colors.gray || "#6B7280";
        case "lightPrimary":
          return theme.colors.lightPrimary || "#6B7280";
        case "outline":
          return "transparent";
        case "destructive":
          return theme.colors.white || "#DC2626";
        case "ghost":
          return "transparent";
        default:
          return theme.colors.primary;
      }
    };

    // Make sure 'link' variant has a light gray text when disabled
    const getTextColor = () => {
      if (textColor) return textColor;
      if (disabled) {
        if (variant === "link") return theme.colors.tertiary; // Light gray for disabled link
        return theme.colors.white;
      }
      switch (variant) {
        case "outline":
          return theme.colors.black;
        case "lightPrimary":
          return theme.colors.primary;
        case "ghost":
        case "link":
          return theme.colors.black;
        default:
          return theme.colors.white;
      }
    };

    const getBorderColor = () => {
      if (variant === "outline") return "#B4B4B4";
      return "transparent";
    };

    const getSizeStyles = () => {
      switch (size) {
        case "lg":
          return {
            paddingVertical: 10,
            paddingHorizontal: theme.spacing.l_32,
            fontSize: theme.textVariants.large.fontSize,
          };
        case "md":
          return {
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: theme.textVariants.md.fontSize,
          };
        case "sm":
          return {
            paddingVertical: 10,
            paddingHorizontal: theme.spacing.m_16,
            fontSize: theme.textVariants.sm.fontSize,
          };
        case "icon":
          return { height: 36, width: 36 };
        default:
          return {
            paddingVertical: 10,
            paddingHorizontal: 16,
            fontSize: theme.textVariants.md.fontSize,
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
            flexDirection: "row",
            width: width ? width : "auto",
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
                  fontFamily,
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
