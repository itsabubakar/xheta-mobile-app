import React, { useRef, useState } from "react";
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
  StyleSheet,
} from "react-native";

import { Chevron, ClosedEye, Microscope, OpenedEye } from "~/assets/icons";
import { Box, Text, theme } from "~/theme";

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
  (
    { label, error, style, shadow, type = "text", disabled = false, ...props },
    ref,
  ) => {
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
        {label && <Text mb="s_8">{label}</Text>}
        <View style={{ position: "relative" }}>
          <RNTextInput
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor="#808080"
            editable={!disabled} // Disable editing if disabled is true
            style={[
              {
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                backgroundColor: theme.colors.lightGray, // Change background for disabled state
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

          {type === "password" && !disabled && (
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
              <Text>{isPasswordVisible ? <OpenedEye /> : <ClosedEye />}</Text>
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
  disabled, // Add the disabled prop here
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
      disabled={disabled} // Pass the disabled prop to Input
      // error={fieldState.error?.message}
      {...inputProps}
    />
  );
}

type Option = {
  label: string;
  value: string | number;
};

interface DropdownProps {
  label?: string;
  options: Option[]; // Options for the dropdown
  selectedValue?: string | number; // The value that is selected (for single select)
  onSelect: (value: string | number) => void; // Function to handle selecting a value
  error?: string;
  disabled?: boolean;
  multiSelect?: boolean; // Enable multi-select mode
  selectedValues?: (string | number)[]; // The values that are selected (for multi-select)
  onMultiSelect?: (values: (string | number)[]) => void; // Function to handle multi-select
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  error,
  disabled = false,
  multiSelect = false,
  selectedValues = [],
  onMultiSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleMultiSelect = (value: string | number) => {
    if (onMultiSelect && !disabled) {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      onMultiSelect(updatedValues);
    }
  };

  return (
    <Box mb="m_16">
      {label && (
        <Text variant="md" mb="s_8">
          {label}
        </Text>
      )}
      <Pressable
        onPress={toggleDropdown}
        disabled={disabled}
        style={[
          styles.dropdown,
          {
            borderColor: error
              ? "#FF6B6B"
              : isOpen
                ? theme.colors.primary
                : "#D2D2D240",
            opacity: disabled ? 0.8 : 1, // Reduce opacity if disabled
          },
        ]}
      >
        <Text
          style={{
            flex: 1,
            color:
              multiSelect && selectedValues.length > 0
                ? theme.colors.black
                : selectedValue
                  ? theme.colors.black
                  : "#686868",
          }}
        >
          {multiSelect && selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : selectedValue
              ? options.find((o) => o.value === selectedValue)?.label
              : "Nil"}
        </Text>
        <View
          style={{
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        >
          <Chevron />
        </View>
      </Pressable>
      {isOpen && !disabled && (
        <Box mt="s_8" style={styles.dropdownContent}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => {
                if (multiSelect) {
                  handleMultiSelect(option.value);
                } else {
                  onSelect(option.value);
                  setIsOpen(false);
                }
              }}
              style={[
                styles.option,
                {
                  backgroundColor: multiSelect
                    ? selectedValues.includes(option.value)
                      ? theme.colors.tertiary
                      : "#fff"
                    : option.value === selectedValue
                      ? theme.colors.tertiary
                      : "#fff",
                },
              ]}
            >
              <Text>{option.label}</Text>
              {multiSelect && (
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: selectedValues.includes(option.value)
                        ? theme.colors.primary
                        : "#fff",
                      borderColor: selectedValues.includes(option.value)
                        ? theme.colors.primary
                        : "#D2D2D2",
                    },
                  ]}
                />
              )}
            </Pressable>
          ))}
        </Box>
      )}
      {error && (
        <Text style={{ color: "red" }} variant="body" mt="s_8">
          {error}
        </Text>
      )}
    </Box>
  );
};

// Styles for the dropdown
const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.lightGray,
    flexDirection: "row",
    alignItems: "center",

    // Shadow for iOS
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Elevation for Android
    elevation: 1,
  },
  dropdownContent: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
    backgroundColor: "#fff",
    borderColor: theme.colors.lightGray,

    // Apply same shadow styles here if you want shadow for dropdown content
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: "auto",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.white,
    textAlignVertical: "top", // Align text to the top of the text area
  },
});

// Exported Controlled Dropdown for React Hook Form
interface ControlledDropdownProps<T extends FieldValues>
  extends Omit<DropdownProps, "onSelect" | "onMultiSelect"> {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
}

export function ControlledDropdown<T extends FieldValues>({
  name,
  control,
  rules,
  multiSelect = false,
  disabled = false, // Add disabled prop here
  ...dropdownProps
}: ControlledDropdownProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: rules as any,
  });

  return (
    <Dropdown
      selectedValue={multiSelect ? undefined : (field.value as string | number)}
      selectedValues={multiSelect ? (field.value as (string | number)[]) : []}
      onSelect={(value) => field.onChange(value)}
      onMultiSelect={(values) => field.onChange(values)}
      error={fieldState.error?.message}
      multiSelect={multiSelect}
      disabled={disabled} // Pass the disabled prop
      {...dropdownProps}
    />
  );
}

interface SearchInputProps extends TextInputProps {
  onSearch: (query: string) => void; // Function to handle the search query
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  ...props
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<RNTextInput>(null);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box mb="s_8">
      <View style={{ position: "relative" }}>
        <RNTextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch} // Trigger search when Enter is pressed
          placeholder={placeholder}
          placeholderTextColor="#686868"
          style={[
            {
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#FFFFFF", // White background
              borderColor: "#D2D2D240",
              paddingLeft: 40, // Add padding for the icon
            },
          ]}
          {...props}
        />
        {/* Microscope Icon */}
        <Pressable
          onPress={handleSearch}
          style={{
            position: "absolute",
            left: 12,
            top: "25%",
            height: 24,
            width: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Microscope />
        </Pressable>
      </View>
    </Box>
  );
};

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
}) => {
  return (
    <Box mb="s_8">
      {label && <Text mb="s_8">{label}</Text>}
      <View style={{ position: "relative" }}>
        <RNTextInput
          multiline
          numberOfLines={6}
          placeholder={placeholder}
          placeholderTextColor="#686868"
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          style={[
            styles.textArea,
            {
              borderColor: error ? "#FF6B6B" : "#D2D2D240",
            },
          ]}
        />
      </View>
      {error && (
        <Text variant="body" color="gray" mt="s_8">
          {error}
        </Text>
      )}
    </Box>
  );
};

interface ControlledTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
  label: string; // Add label prop to ControlledTextAreaProps
  placeholder: string;
}

export function ControlledTextArea<T extends FieldValues>({
  name,
  control,
  rules,
  label, // Destructure the label prop
  ...textAreaProps
}: ControlledTextAreaProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: rules as any, // Cast rules to any
  });

  return (
    <TextArea
      label={label} // Pass the label to TextArea
      value={field.value as string}
      onChangeText={field.onChange}
      error={fieldState.error?.message}
      {...textAreaProps}
    />
  );
}
