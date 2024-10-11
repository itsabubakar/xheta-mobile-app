import React, { useState } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";

import { theme } from "~/theme";

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  switchWidth?: number;
  switchHeight?: number;
  thumbSize?: number;
  thumbPadding?: number;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  activeColor = theme.colors.primary,
  inactiveColor = theme.colors.lightBlack,
  thumbColor = theme.colors.white,
  switchWidth = 36,
  switchHeight = 20,
  thumbSize = 15,
  thumbPadding = 4,
}) => {
  const [position] = useState(new Animated.Value(value ? 1 : 0));

  // Handle press and animate
  const toggleSwitch = () => {
    Animated.timing(position, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onValueChange(!value);
  };

  // Calculate thumb position based on the value and padding
  const thumbPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: [thumbPadding, switchWidth - thumbSize - thumbPadding],
  });

  return (
    <Pressable onPress={toggleSwitch}>
      <View
        style={[
          styles.switchContainer,
          {
            width: switchWidth,
            height: switchHeight,
            borderRadius: switchHeight,
            backgroundColor: value ? activeColor : inactiveColor,
          },
        ]}
      >
        {/* Animated Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: "center",
    padding: 4,
  },
  thumb: {
    position: "absolute",
  },
});
