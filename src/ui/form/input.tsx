import React from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

import { Box, Text } from "~/theme";

interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
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
  rules?: RuleType<T>;
}

export const Input = React.forwardRef<RNTextInput, NInputProps>(
  ({ label, error, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocused(false), []);
    const onFocus = React.useCallback(() => setIsFocused(true), []);

    return (
      <Box mb="s_8">
        {label && (
          <Text variant="subtitle" mb="s_8">
            {label}
          </Text>
        )}
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
              backgroundColor: "#F5F5F5",
              borderColor: error
                ? "#FF6B6B"
                : isFocused
                  ? "#007AFF"
                  : "#D3D3D3",
            },
            style,
          ]}
          {...props}
        />
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
