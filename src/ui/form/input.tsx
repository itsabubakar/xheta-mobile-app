import React from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import {
  TextInput as RNTextInput,
  TextInputProps,
  Pressable,
  View,
} from "react-native";

import { ClosedEye } from "~/assets/icons";
import { Box, Text, useTheme } from "~/theme";

interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  shadow?: boolean;
  type?: "text" | "password"; // New prop for input type
}

type TRule<T extends FieldValues> = RegisterOptions<T>;

export type RuleType<T extends FieldValues> = {
  [name in keyof T]?: TRule<T>;
};

export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues> extends NInputProps {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
}

export const Input = React.forwardRef<RNTextInput, NInputProps>(
  ({ label, error, style, shadow, type = "text", ...props }, ref) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const onBlur = React.useCallback(() => setIsFocused(false), []);
    const onFocus = React.useCallback(() => setIsFocused(true), []);
    const togglePasswordVisibility = () =>
      setIsPasswordVisible(!isPasswordVisible);

    const shadowStyles = shadow
      ? {
          // Shadow for iOS
          shadowColor: "#101828",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          // Elevation for Android
          elevation: 1,
        }
      : {};

    return (
      <Box mb="s_8">
        {label && (
          <Text variant="subtitle" mb="s_8">
            {label}
          </Text>
        )}
        <View style={{ position: "relative" }}>
          <RNTextInput
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor="#808080"
            style={[
              {
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                backgroundColor: "#F7F7F9",
                borderColor: error
                  ? "#FF6B6B"
                  : isFocused
                    ? theme.colors.primary
                    : "#D2D2D240",
                paddingRight: type === "password" ? 40 : 12, // Add padding for the eye icon
              },
              style,
              shadowStyles,
            ]}
            secureTextEntry={type === "password" && !isPasswordVisible} // Control secureTextEntry
            {...props}
          />

          {type === "password" && (
            <Pressable
              onPress={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: 12,
                top: "25%",
                height: 24,
                width: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Change icon based on password visibility state */}
              <Text>{isPasswordVisible ? <ClosedEye /> : <ClosedEye />}</Text>
            </Pressable>
          )}
        </View>

        {error && (
          <Text variant="body" color="gray" mt="s_8">
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  rules,
  ...inputProps
}: ControlledInputProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: rules as any, // Cast rules to any
  });

  return (
    <Input
      ref={field.ref}
      onChangeText={field.onChange}
      value={(field.value as string) || ""}
      error={fieldState.error?.message}
      {...inputProps}
    />
  );
}
