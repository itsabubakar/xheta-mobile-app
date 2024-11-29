import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";

interface ToastProps {
  type: "success" | "error"; // Toast type
  message: string; // Toast message
  onDismiss: () => void; // Dismiss handler
  duration?: number; // Optional duration
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onDismiss,
  duration = 3000,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // Starts above the screen

  useEffect(() => {
    // Slide down animation
    Animated.timing(slideAnim, {
      toValue: 0, // Slide into view
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss the toast after the duration
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start(() => onDismiss()); // Call onDismiss after animation
    }, duration);

    // Clear timeout on unmount
    return () => clearTimeout(timer);
  }, [slideAnim, onDismiss, duration]);

  const backgroundColor = type === "success" ? "#D4EDDA" : "#F8D7DA"; // Green for success, red for error
  const borderColor = type === "success" ? "#C3E6CB" : "#F5C6CB";
  const textColor = type === "success" ? "#155724" : "#721C24";
  const icon = type === "success" ? "checkmark-circle" : "close-circle";

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor,
          borderColor,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.iconAndMessage}>
        <Ionicons name={icon} size={24} color={textColor} style={styles.icon} />
        <Text style={[styles.toastText, { color: textColor }]}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
  iconAndMessage: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  toastText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default Toast;
